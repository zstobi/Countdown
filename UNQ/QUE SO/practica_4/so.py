#!/usr/bin/env python

from kernelComponents.State import New
from kernelComponents.InterruptionHandlers import *
from kernelComponents.Dispatcher import Dispatcher
from kernelComponents.IoDeviceController import IoDeviceController
from kernelComponents.Loader import Loader
from kernelComponents.PCBs import *
from kernelComponents.Queues import ReadyQueue
from kernelComponents.Scheduler import *
from hardware import *


# emulates the core of an Operative System
class Kernel():

    def __init__(self):
        ## setup interruption handlers
        killHandler = KillInterruptionHandler(self)
        HARDWARE.interruptVector.register(KILL_INTERRUPTION_TYPE, killHandler)

        ioInHandler = IoInInterruptionHandler(self)
        HARDWARE.interruptVector.register(IO_IN_INTERRUPTION_TYPE, ioInHandler)

        ioOutHandler = IoOutInterruptionHandler(self)
        HARDWARE.interruptVector.register(IO_OUT_INTERRUPTION_TYPE, ioOutHandler)
        
        newHandler = NewInterruptionHandler(self)
        HARDWARE.interruptVector.register(NEW_INTERRUPTION_TYPE, newHandler) 

        self.statHandler = StatInterruptionHandler(self)
        HARDWARE.interruptVector.register(STAT_INTERRUPTION_TYPE, self.statHandler) 
        
        timeOutHandler = TimeOutInterruptionHandler(self)
        HARDWARE.interruptVector.register(TIMEOUT_INTERRUPTION_TYPE, timeOutHandler)

        ## controls the Hardware's I/O Device
        self._ioDeviceController = IoDeviceController(HARDWARE.ioDevice)
        
        self._loader = Loader()
        
        self._dispatcher = Dispatcher()

        self._pcb_table = PCBTable()

        # self._ready_queue = ReadyQueue()

        self._running_pcb = RunningPCB()

        # self._scheduler = FCFSScheduler()
        self._scheduler = PriorityScheduler()
        # self._scheduler = PrioritySchedulerEX()
        # self._scheduler = RRScheduler(self, 4)
        
        # self._diagram = []
        
        self.activity = []
        
        self.ready_pids = [["R", "E", "A", "D", "Y", "-", "-", "-"]]
        
        self._processes_info = set()
    
    @property
    def ioDeviceController(self):
        return self._ioDeviceController
    
    def save(self, pcb):
        return self._dispatcher.save(pcb)

    def run(self, program):
        newIRQ = IRQ(NEW_INTERRUPTION_TYPE, program)
        HARDWARE.interruptVector.handle(newIRQ)

    def no_one_running(self):
        return self._running_pcb.get_current() == None

    def is_queue_empty(self):
        # print(self._scheduler.queue_length())
        return self._scheduler.queue_length() == 0
    
    def pop_first_from_queue(self):
        return self._scheduler.pop_first_from_queue()
        
    def load_program(self, program, pcb):
        base_dir = pcb._base_dir
        self._loader.load_program(program, base_dir)
    
    def add_pcb_to_rq(self, pcb):
        self._scheduler.add_new_pcb(pcb)
        
    def load_pcb(self, pcb):
        
        self._dispatcher.load(pcb)
        
    def has_preemptive_queue(self):
        return self._scheduler.must_expropiate()
    
    def set_idle(self):
        self._dispatcher.idle()
        
    def current_pc(self):
        return self._dispatcher.pc()
    
    def set_timer(self, quantum):
        self._dispatcher.init_timer(quantum)
        
    def priority_select(self, incoming_pcb, running):
        return self._scheduler.priority_select(incoming_pcb, running)
        
    def reset_timer(self):
        self._dispatcher.reset_timer()
        
    def ready_queue(self):
        return self._scheduler._ready_queue.get_elements()                                                                  #cambiar
    
    def send_diagram(self):
        self.statHandler.show_diagram() #                                                                                       #sirve??
    
    def age_priority(self):
        self._scheduler.age_queue()
    
    #----------------------- PCB --------------------------

    def generate_pcb(self, program, base_dir):                                                                              # lo hace kernel?
        pid = self._pcb_table.getNewPID()
        pc = 0
        state = New()
        path = program.name
        priority = program._priority
        length = len(program._instructions)
        return PCB(pid, base_dir, pc, state, path, priority, length)
    
    def add_new_pcb(self, program):
        base_dir = self._loader.next_base_dir(program)
        pcb = self.generate_pcb(program, base_dir)
        self._pcb_table.add(pcb)
        return pcb
    
    def get_running_pcb(self):
        return self._running_pcb.get_current()
    
    def set_running_pcb(self, pcb):
        self._running_pcb.set_current(pcb)
        
    def remove_pcb_with_pid(self, pid):
        self._pcb_table.remove(pid)

    def change_state(self, pcb, state):
        pcb._state = state
    
    def get_next_base_dir(self, program):
        return self._loader.next_base_dir(program)

    def add_pcb_to_table(self, pcb):
        self._pcb_table.add(pcb)
    
    def __repr__(self):
        return "Kernel "
    
