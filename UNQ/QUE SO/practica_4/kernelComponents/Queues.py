from heapq import heappush, heappop

class Queue():
    def __init__(self):
        self.elements = []

    def add_new_pcb(self, pcb):
        self.elements.append(pcb)

    def length(self):
        return len(self.elements)

    def first(self):
        return self.elements[0]

    def pop_first(self):
        return self.elements.pop(0)

    def __repr__(self):
        return f"{self.elements}"
    
    def get_elements(self):
        return self.elements

class ReadyQueue(Queue):
    pass


# class ReadyQueuePriority(Queue):
#     # def __init__(self):
#     #     self.elements = []

#     def add_new_pcb(self, pcb):
        
#         heappush(self.elements, pcb)
        
#     def first(self):
#         return heappop(self.elements)

    
class ReadyQueuePriority(Queue):
    def __init__(self):
        self.elements = {
            "priority0": [], 
            "priority1": [],
            "priority2": [],
            "priority3": [],
            "priority4": [],
            "priority5": [],
            "priority6": [], 
            "priority7": [],
            "priority8": [],
            "priority9": []
        }

    def add_new_pcb(self, pcb):
        num = pcb._priority
        self.elements[f"priority{num}"].append(pcb)
        print(self.elements[f"priority{num}"], pcb)
        # print(self.elements)
        
        
    def pop_first(self):
        for i in range(0,10):
            isNotEmpty = len(self.elements[f"priority{i}"]) != 0
            if isNotEmpty:            
                # print(priority_list.pop(0))
                return self.elements[f"priority{i}"].pop(0)
            
    def first(self):
        for i in range(0,10):
            isNotEmpty = len(self.elements[f"priority{i}"]) != 0
            if isNotEmpty:            
                # print(priority_list.pop(0))
                return self.elements[f"priority{i}"][0]
            
    def age(self):
        # current_list = self.elements["priority9"]                    
        # self.elements["priority8"].append(current_list)
        for i in range(1,10):
            current_list = self.elements[f"priority{i}"]                    
            self.elements[f"priority{i-1}"].extend(current_list)
            self.elements[f"priority{i}"] = []
            
    def length(self):
        length = 0
        for i in range(0,10):
            # print(len(priority_list))
            length += len(self.elements[f"priority{i}"])
        return length

    def get_elements(self):
        elements = []
        for i in range(0,10):
            elements.extend(self.elements[f"priority{i}"])
            
        # print(elements)
        return elements 
    
    def __repr__(self):
        repr = ""
        for i in range(0,10):
            current_list = self.elements[f"priority{i}"]
            repr += f"priority{i} = {current_list}\n"
        return repr

# lista_de_listas = [[1, 2], [3, 4], [5, 6]]
# lista_externa = []

# for lista in lista_de_listas:
#     lista_externa.extend(lista)

# print(lista_externa)