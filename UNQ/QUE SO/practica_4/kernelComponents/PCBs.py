# from so import New

class New():
    def __repr__(self):
        return "New"

class PCB():
    def __init__(self, pid, base_dir, pc, state, path, priority, length):
        self._pid      = pid
        self._base_dir = base_dir
        self._pc       = pc
        self._state    = state
        self._path     = path
        self._priority = priority
        self._length   = length

    def __repr__(self):
        # return f"PCB(pid={self._pid}, base_dir={self._base_dir}, pc={self._pc}, state={self._state}, path={self._path}, priority={self._priority}, length={self._length})"
        return f"Program {self._pid}, p {self._priority})"
    
    def __lt__(self, other):
        return self._priority < other._priority
    
    # def __eq__(self, value):
    #     if value == None: return False
    #     self._pid == value._pid

class RunningPCB():
    def __init__(self):
        self.current_pcb = None

    def set_current(self, pcb):
        self.current_pcb = pcb

    def get_current(self):
        return self.current_pcb

class PCBTable():
    def __init__(self):
        self._table = {}
        self.pid = 0

    def get(self, pid):
        return self._table[pid]
    
    def add(self, pcb):
        self._table[self.pid] = pcb
        self.pid += 1

    def remove(self, pid):
        del self._table[pid]

    def getNewPID(self):
        return self.pid

    def __repr__(self):
        return f"{self._table}"