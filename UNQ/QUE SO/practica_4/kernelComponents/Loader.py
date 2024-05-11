
from hardware import HARDWARE


class Loader():

    def __init__(self):
        self._base_dir = 0

    def next_base_dir(self, program):
        next_base_dir = self._base_dir
        self._base_dir += len(program.instructions)
        # print(f" BASEDIR DE LOADER: {self._base_dir}")
        return next_base_dir

    def load_program(self, program, base_dir):
        # loads the program in main memory
        progSize = len(program.instructions)
        for index in range(0, progSize):
            # print(index)
            inst = program.instructions[index]
            HARDWARE.memory.write(base_dir + index, inst)
        print(HARDWARE.memory)