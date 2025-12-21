extends Node2D

# Task:
# Move the node with arrow keys.
# Hint: Input.get_action_strength("ui_right") etc.

@export var speed: float = 200.0

func _process(delta: float) -> void:
    var x = Input.get_action_strength("ui_right") - Input.get_action_strength("ui_left")
    var y = Input.get_action_strength("ui_down") - Input.get_action_strength("ui_up")
    var dir = Vector2(x, y)

    if dir.length() > 0:
        position += dir.normalized() * speed * delta
