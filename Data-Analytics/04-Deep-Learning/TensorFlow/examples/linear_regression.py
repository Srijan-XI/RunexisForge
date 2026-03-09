import numpy as np
import tensorflow as tf

# y = 2x + 1 (synthetic data)
x = np.linspace(-1, 1, 200).astype(np.float32)
y = (2 * x + 1).astype(np.float32)

model = tf.keras.Sequential([
    tf.keras.layers.Dense(1, input_shape=(1,))
])
model.compile(optimizer="adam", loss="mse")

model.fit(x, y, epochs=50, verbose=0)

pred = model.predict(np.array([0.0, 1.0], dtype=np.float32), verbose=0)
print("predictions:", pred.flatten().tolist())
