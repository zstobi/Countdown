from kernelComponents.Queues import *

class Scheduler():
    def __init__(self):
        self._ready_queue = ReadyQueue()

    def must_expropiate(self):
        raise "Should be overriden in subclass"
    
    def priority_select(self, incoming_pcb, running):
        raise "Should be overriden in subclass"
    
    def queue_length(self):
        return self._ready_queue.length()

    def add_new_pcb(self, pcb):
        self._ready_queue.add_new_pcb(pcb)
    
    def pop_first_from_queue(self):
        return self._ready_queue.pop_first()
    
    def get_pcbs(self):
        return self._ready_queue.get_elements()
    
    def age_queue(self):
        pass


class FCFSScheduler(Scheduler):
    def must_expropiate(self):
        return False
    
    def priority_select(self, incoming_pcb, running):
        return False
    
    # def add_new_pcb(self, pcb):
    #     self._ready_queue.add_new_pcb(pcb)

class PriorityScheduler(Scheduler):
    def __init__(self):
        self._ready_queue = ReadyQueuePriority()
        
    def must_expropiate(self):
        return False
    
    def priority_select(self, incoming_pcb, running):
        return False
    
    def age_queue(self):
        self._ready_queue.age()
        
    def queue_length(self):
        return self._ready_queue.length()

    # def add_new_pcb(self, pcb):
    #     self._ready_queue.add_new_pcb(pcb)
        
        # if juan < pepe -> lo pone, sino sigue recursionando
    #    self.add_new_pcb(pcb)
    
class PrioritySchedulerEX(Scheduler):
    def __init__(self):
        self._ready_queue = ReadyQueuePriority()
        
    def must_expropiate(self):
        return True
    
    def priority_select(self, incoming_pcb, running):
        return incoming_pcb._priority < running._priority
    
    def age_queue(self):
        self._ready_queue.age()
        
    def queue_length(self):
        return self._ready_queue.length()

    # def add_new_pcb(self, pcb):
    #     self._ready_queue.add_new_pcb(pcb)

class RRScheduler(Scheduler):
    def __init__(self, kernel, quantum):
        self._ready_queue = ReadyQueue()
        kernel.set_timer(quantum)
    
    def must_expropiate(self):
        return True
    
    def priority_select(self, incoming_pcb, running):
        return False
    
    # def add_new_pcb(self, pcb):
    #     self._ready_queue.add_new_pcb(pcb)