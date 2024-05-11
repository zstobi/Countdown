from hardware import HARDWARE


class Dispatcher():
    # pone un proceso en ejecución y lo saca de ejecución

    def load(self, pcb):
        HARDWARE.cpu.pc = pcb._pc
        HARDWARE.mmu.baseDir = pcb._base_dir
        
    def save(self, pcb):
        pcb._pc = HARDWARE.cpu.pc
        return pcb
    
    def idle(self):
        HARDWARE.cpu.pc = -1
        
    def pc(self):
        return HARDWARE.cpu.pc
    
    def init_timer(self, init_quantum):
        HARDWARE.timer.quantum = init_quantum
        
    def reset_timer(self):
        HARDWARE.timer.reset()