//Question: Write a program to read from and write to a text file.
import java.io.*;

public class Q9_Advanced_FileReadWrite {
    public static void main(String[] args) {
        String filename = "example.txt";
        try {
            FileWriter fw = new FileWriter(filename);
            fw.write("Hello File Handling in Java!");
            fw.close();

            BufferedReader br = new BufferedReader(new FileReader(filename));
            String line;
            while ((line = br.readLine()) != null)
                System.out.println(line);
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
