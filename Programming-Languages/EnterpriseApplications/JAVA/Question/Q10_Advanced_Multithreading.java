//Question: Demonstrate multithreading using the Thread class.
class MyThread extends Thread {
    public void run() {
        for (int i = 0; i < 5; i++)
            System.out.println(getName() + " - Count: " + i);
    }
}

public class Q10_Advanced_Multithreading {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        t1.start();
        t2.start();
    }
}
// This code demonstrates multithreading by creating two threads that print their names and a count.