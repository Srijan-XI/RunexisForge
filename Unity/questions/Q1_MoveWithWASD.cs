using UnityEngine;

// Task:
// Move the GameObject using WASD keys.
// Hint: Use Input.GetAxis("Horizontal") and Input.GetAxis("Vertical").

public class Q1_MoveWithWASD : MonoBehaviour
{
    public float speed = 5f;

    void Update()
    {
        float x = Input.GetAxis("Horizontal");
        float z = Input.GetAxis("Vertical");

        Vector3 delta = new Vector3(x, 0f, z) * speed * Time.deltaTime;
        transform.position += delta;
    }
}
