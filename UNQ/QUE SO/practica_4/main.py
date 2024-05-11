from Program import Program
from hardware import *
from so import *
import log


##
##  MAIN 
##
if __name__ == '__main__':
    log.setupLogger()
    log.logger.info('Starting emulator')

    ## setup our hardware and set memory size to 25 "cells"
    HARDWARE.setup(25)

    ## Switch on computer
    HARDWARE.switchOn()

    ## new create the Operative System Kernel
    # "booteamos" el sistema operativo
    kernel = Kernel()

    # Ahora vamos a intentar ejecutar 3 programas a la vez
    ##################
    prg1 = Program("prg1.exe", [ASM.CPU(2), ASM.IO(), ASM.CPU(3), ASM.IO(), ASM.CPU(2)], 9)
    prg2 = Program("prg2.exe", [ASM.CPU(5)], 5)
    prg3 = Program("prg3.exe", [ASM.CPU(4), ASM.IO(), ASM.CPU(1)], 0)
    prg4 = Program("prg4.exe", [ASM.CPU(3), ASM.IO()], 1)
    prg5 = Program("prg5.exe", [ASM.CPU(4)], 3)
    prg6 = Program("prg6.exe", [ASM.CPU(4)], 0)


    kernel.run(prg4)
    kernel.run(prg5)
    kernel.run(prg4)
    kernel.run(prg4)
    kernel.run(prg6)




