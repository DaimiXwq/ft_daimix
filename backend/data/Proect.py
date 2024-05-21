class OneLinkList:
    class Node:
        def __init__(self, data):
            self.data = data
            self.next_node = None

    def __init__(self):
        self.head = None
        self.lenght = 0

    def is_empty(self):
        return self.head is None

    def add(self, data):
        new_node = self.Node(data)
        if self.is_empty():
            self.head = new_node
            self.lenght = 1
            return
        last_node = self.head
        while last_node.next_node:
            last_node = last_node.next_node
        last_node.next_node = new_node
        self.lenght += 1


    def get_len(self):
        return self.lenght

    def get_elem(self, index=0):
        temp_node = self.head
        for current in range(index):
            temp_node = temp_node.next_node
        return temp_node.data

    def prepend(self, data):
        # Добавление элемента в начало списка
        new_node = self.Node(data)
        new_node.next_node = self.head
        self.head = new_node

    def delete(self):
        while not self.is_empty():
            self.delete_elem_index(0)



    def delete_elem(self, data):
        # Удаление элемента из списка
        current_node = self.head
        if current_node and current_node.data == data:
            # Если удаляется голова списка
            self.head = current_node.next_node
            current_node = None
            return
        prev_node = None
        while current_node and current_node.data != data:
            prev_node = current_node
            current_node = current_node.next_node
        if current_node is None:
            # Элемент не найден
            return
        prev_node.next_node = current_node.next_node
        current_node = None

    def delete_elem_index(self, index):
        cur = 0
        current_node = self.head
        if current_node and cur == index:
            # Если удаляется голова списка
            self.head = current_node.next_node
            current_node = None
            return
        prev_node = None
        while current_node and cur != index:
            prev_node = current_node
            current_node = current_node.next_node
            cur+=1
        if current_node is None:
            # Элемент не найден
            return
        prev_node.next_node = current_node.next_node
        current_node = None

    def display(self):
        # Вывод содержимого списка
        current_node = self.head
        while current_node:
            print(current_node.data, end=" -> ")
            current_node = current_node.next_node
        print("None")


class SkipList(OneLinkList):
    def __init__(self):
        super().__init__()

    def insert(self, data):
        new_node = self.Node(data)
        if self.is_empty():
            self.head = new_node
            return
        current_node = self.head
        while current_node.next_node and current_node.data < data:
            current_node = current_node.next_node

        new_node.next_node = current_node.next_node
        current_node.next_node = new_node


    def display(self):
        current_node=self.head
        while current_node:
            print(current_node.data, end="->")
            current_node = current_node.next_node
        print("None")





if __name__ == "__main__":
    A = OneLinkList()
    A.add(5)
    A.add(14)
    print("Список")
    A.add('Слово')
    print(A.get_elem())
    print(A.get_elem(1))
    print(A.get_elem(2))
    print('длина: ')
    print(A.get_len())
    A.display()
    A.delete()
    A.display()

    print("Список с пропусками")
    skip_list = SkipList()
    skip_list.insert(6)
    skip_list.display()
    skip_list.insert(1)
    skip_list.display()
    skip_list.insert(17)
    skip_list.display()
    skip_list.insert(3)
    skip_list.display()