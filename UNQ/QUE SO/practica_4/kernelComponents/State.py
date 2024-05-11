

RED = '\033[91m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
RESET = '\033[0m'
CYAN = '\033[36m'
DIM       = '\033[2m'
BRIGHT    = '\033[1m'
GREY = "\033[90m"


class New():
    def __repr__(self):
        return "New"
    
    def info(self, length, pc):
        return "o_o"

    # def is_terminated(self):
    #     return False


class Ready():
    def __repr__(self):
        return "Ready"
    
    def info(self, length, pc):
        return DIM + YELLOW + "..." + RESET
    
    # def is_terminated(self):
    #     return False


class Running():
    def __repr__(self):
        return "Running"
    
    def info(self, length, pc):
        return GREEN + f"{length - pc}" + RESET

    # def is_terminated(self):
    #     return False


class Waiting():
    def __repr__(self):
        return "Waiting"
    
    def info(self, length, pc):
        return DIM + CYAN + "._." + RESET

    # def is_terminated(self):
    #     return False


class Terminated():
    def __repr__(self):
        return "Terminated"
    
    def info(self, length, pc):
        return GREY + "-O-" + RESET

    # def is_terminated(self):
    #     return True