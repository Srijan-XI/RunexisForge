# Q1: Build and train a tiny model
#
# Goal:
# - Create a Keras model that learns y = 3x - 2 using synthetic data.
# - Train it and print predictions for x=0 and x=1.

import numpy as np
import tensorflow as tf

# TODO: generate data
x = np.linspace(-1, 1, 200).astype(np.float32)
y = x

# TODO: build model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(1, input_shape=(1,))
])

# TODO: compile + fit

# TODO: predict
