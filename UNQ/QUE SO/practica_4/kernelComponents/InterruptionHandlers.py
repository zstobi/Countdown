from kernelComponents.State import Ready, Running, Terminated, Waiting
import log
from hardware import HARDWARE, log, sleep
from tabulate import tabulate

class AbstractInterruptionHandler():
    def __init__(self, kernel):
        self._kernel = kernel

    @property
    def kernel(self):
        return self._kernel

    def execute(self, irq):
        log.logger.error("-- EXECUTE MUST BE OVERRIDEN in class {classname}".format(classname=self.__class__.__name__))
    
    def change_state(self, pcb, state):
        pcb._state = state
        
    def run_next(self):
        
        if self._kernel.is_queue_empty(): return

        pcb = self._kernel.pop_first_from_queue()
        self._kernel.reset_timer()

        self.run_pcb(pcb)
        
    def run_pcb(self, pcb):
        
        self._kernel.load_pcb(pcb)
        self._kernel.set_running_pcb(pcb)
        self.change_state(pcb, Running())
        
    def save_current_state(self, state):
        pcb = self._kernel.get_running_pcb()
        pcb = self._kernel.save(pcb)
        
        self.change_state(pcb, state)
        
        self.set_none_running()
        
        return pcb

    def set_none_running(self):
        self._kernel.set_running_pcb(None)
        
    def send_to_rq(self, pcb):
        
        isEmpty = self._kernel.is_queue_empty() and self._kernel.no_one_running()
        
        
        if isEmpty:
            self.run_pcb(pcb)
            
        elif self.can_expropiate(pcb):
            old_pcb = self.save_current_state(Ready())
            self.add_to_rq(old_pcb)
            self.run_pcb(pcb)
        else: 
            self.add_to_rq(pcb)

    def can_expropiate(self, incoming_pcb):
        running = self._kernel.get_running_pcb()
        return self.priority_select(incoming_pcb, running)     #self._kernel.has_preemptive_queue() no es necesario, no?

    def priority_select(self, incoming_pcb, running):
        return self._kernel.priority_select(incoming_pcb, running)

    def add_to_rq(self, pcb):
        self._kernel.add_pcb_to_rq(pcb)
        self.change_state(pcb, Ready())
    
    def set_idle(self):
        self._kernel.set_idle()

class KillInterruptionHandler(AbstractInterruptionHandler):

    def execute(self, irq):
        # operation = irq.parameters
        log.logKILL(" Program Finished ")
        
        self.set_idle()
        
        self.finish_program()
        
        self.run_next()

        self._kernel.send_diagram()
        print(self._kernel._scheduler._ready_queue.__repr__())

    def finish_program(self):
        pcb = self._kernel.get_running_pcb()
        self.change_state(pcb, Terminated())
        self.set_none_running()
        pid = pcb._pid
        self._kernel.remove_pcb_with_pid(pid)

class IoInInterruptionHandler(AbstractInterruptionHandler):

    def execute(self, irq):
        operation = irq.parameters
        pcb = self.save_current_state(Waiting())
        
        self.set_idle()
        
        self.run_next()
        
         
        self.kernel.ioDeviceController.runOperation(pcb, operation)
        log.logger.info(self.kernel.ioDeviceController)


class IoOutInterruptionHandler(AbstractInterruptionHandler):

    def execute(self, irq):
        pcb = self.kernel.ioDeviceController.getFinishedPCB()
        
        self.send_to_rq(pcb)
        
        log.logIO_OUT(self.kernel.ioDeviceController.__repr__())
        


class NewInterruptionHandler(AbstractInterruptionHandler):

    def execute(self, irq):
        program = irq.parameters
        pcb = self.add_new_pcb(program)
        self.load_program(program, pcb)
        self.send_to_rq(pcb)

    def load_program(self, program, pcb):
        self._kernel.load_program(program, pcb)
         
    def add_new_pcb(self, program):
        base_dir = self._kernel.get_next_base_dir(program)
        pcb = self._kernel.generate_pcb(program, base_dir)
        self._kernel.add_pcb_to_table(pcb)
        return pcb
    

class TimeOutInterruptionHandler(AbstractInterruptionHandler):
    
    def execute(self, irq):
        
        self._kernel.reset_timer()
        
        if not self._kernel.is_queue_empty():                                                           # Está bien meter este if?
            self.timeout_current()

    def timeout_current(self):
        pcb = self.save_current_state(Ready())
        self.send_to_rq(pcb)
        self.run_next()      
        
class Aging():
    def __init__(self, kernel):
        self._kernel = kernel   
        self.timer = 1
        # print(self.timer)
    
    def age(self):
        
        timeout = self.timer == 0
        
        if timeout:
            self._kernel.age_priority()
            self.restart_timer()
        else:
            self.timer -= 1

    def restart_timer(self):
        self.timer = 1
        
class StatInterruptionHandler(AbstractInterruptionHandler):

    def __init__(self, kernel):
        self._kernel = kernel
        self.gantt = Gantt(self, kernel)
        self.aging = Aging(kernel)

    def execute(self, irq):
        self.gantt.fetch_info()
        self.aging.age()

    def show_diagram(self):
        self.gantt.send_diagram()

class Gantt():
    def __init__(self, stat, kernel):
        self._kernel = kernel
        self.stat = stat
        
        self.activity = []
        
        self.ready_pids = [["R", "E", "A", "D", "Y", "-", "-", "-"]]
        
        self.pcbs = set()


    def fetch_info(self):
        
        running = self._kernel.get_running_pcb()

        if running == None: return # de no haber running, no hay nada que registrar
        
        running_length = running._length
        running_pid = running._pid
        self.add_processes([running])
        
        rq = self._kernel.ready_queue()
        self.add_processes(rq)

        self.update_pids_rq(rq)
        
        self.get_new_activity(running_pid, running_length)

    def update_pids_rq(self, rq):
        # pids = self.pcbs
        
        ready_pids = self.extract_pids_with_priority(rq)
        self.ready_pids.append(ready_pids)
        # return pids
        
    def extract_pids(self, pcbs):
        pids = []
        for pcb in pcbs:
            pids.append(pcb._pid)
        return pids
    
    def extract_pids_with_priority(self, pcbs):
        pids = []
        for pcb in pcbs:
            pids.append( '\033[2m' + '\033[93m' + f"{pcb._pid}|{pcb._priority}" + '\033[0m')
        return pids

    def get_new_activity(self, running_pid, running_length):

        new_activity = []

        
        for pcb in sorted(self.pcbs):
            
            pid, t_pcb = pcb

            new_activity.append(t_pcb._state.info(t_pcb._length, self.current_pc()))
        
        self.activity.append(new_activity)

        

    def current_pc(self):
        return self._kernel.current_pc()

    # def is_terminated(self, pid):                                                           #otra manera?
    #     try: 
    #         self._kernel._pcb_table.get(pid)._state
    #         return False
    #     except KeyError:
    #         return True
    
    def send_diagram(self):                                             
        
        self.extract_final_acts_show()
        
        print(tabulate(zip(*self.activity), tablefmt='psql', showindex=True))
        
        self.extract_final_rq_show()
            
        print(tabulate(zip(*self.ready_pids), tablefmt='psql', showindex="never"))
        
    def extract_final_acts_show(self):
        final = []
        for list in self.activity:
            self.list_length_checker(final, list)
        return final

    def extract_final_rq_show(self):
        final = []
        for list in self.ready_pids:
            self.list_length_checker(final, list)
            self.add_color(list)
        return final

    def add_color(self, list):
        
        head = list[0]
        if head == "R" or head == "---": return
        list[0] = '\033[93m' + head.split('\033[93m')[1]
    
    def list_length_checker(self, final, list):
        while len(list) != 8:
            list += ["---"]
                
        # final.append(list)
        
    def add_process(self, pcb):
        
        self.pcbs.add((pcb._pid,pcb))
        
    def add_processes(self, pcbs):
        for pcb in pcbs:
            # self.pcbs.add(pcb)
            self.pcbs.add((pcb._pid,pcb))

