import logging

logger = logging.getLogger()

def setupLogger():
    ## Configure Logger
    handler = logging.StreamHandler()
    formatter = logging.Formatter('%(message)s')
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(logging.DEBUG)

def logKILL(msg):
    red = "\x1b[31;20m"
    reset = "\x1b[0m"
    logger.info(red + msg + reset)
    
def logIO_OUT(msg):
    color = "\033[32m"
    reset = "\x1b[0m"
    logger.info(color + msg + reset)
