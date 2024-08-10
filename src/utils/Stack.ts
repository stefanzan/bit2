export class Stack<T> {
  private items: T[] = [];

  // 添加元素到栈顶
  push(element: T): void {
      this.items.push(element);
  }

  // 从栈顶移除元素
  pop(): T | undefined {
      return this.items.pop();
  }

  // 查看栈顶元素但不移除
  peek(): T | undefined {
      return this.items[this.items.length - 1];
  }

  // 判断栈是否为空
  isEmpty(): boolean {
      return this.items.length === 0;
  }

  // 获取栈的大小
  size(): number {
      return this.items.length;
  }

  // 清空栈
  clear(): void {
      this.items = [];
  }

  // 打印栈内容
  print(): void {
      console.log(this.items.toString());
  }
}
