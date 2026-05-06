package com.gymplan.backend.builder;

import com.gymplan.backend.model.Exercise;
import com.gymplan.backend.model.Workout;

public class DefaultWorkoutDirector {

    public Workout buildChestWorkout() {
        return new CustomWorkoutBuilder()
                .setName("Chest Workout")
                .setDescription("A beginner-friendly chest workout focused on pressing movements.")
                .addExercise(new Exercise("Bench Press", "Chest", "Barbell", "Intermediate", 3, 8))
                .addExercise(new Exercise("Incline Dumbbell Press", "Chest", "Dumbbells", "Beginner", 3, 10))
                .addExercise(new Exercise("Push-Ups", "Chest", "Bodyweight", "Beginner", 3, 12))
                .addExercise(new Exercise("Cable Fly", "Chest", "Cable Machine", "Beginner", 3, 12))
                .build();
    }

    public Workout buildBackWorkout() {
        return new CustomWorkoutBuilder()
                .setName("Back Workout")
                .setDescription("A beginner-friendly back workout focused on pulling movements.")
                .addExercise(new Exercise("Lat Pulldown", "Back", "Machine", "Beginner", 3, 10))
                .addExercise(new Exercise("Seated Cable Row", "Back", "Cable Machine", "Beginner", 3, 10))
                .addExercise(new Exercise("Dumbbell Row", "Back", "Dumbbells", "Beginner", 3, 10))
                .addExercise(new Exercise("Back Extension", "Back", "Bodyweight", "Beginner", 3, 12))
                .build();
    }

    public Workout buildLegWorkout() {
        return new CustomWorkoutBuilder()
                .setName("Leg Workout")
                .setDescription("A beginner-friendly leg workout focused on lower-body strength.")
                .addExercise(new Exercise("Squat", "Legs", "Barbell", "Intermediate", 3, 8))
                .addExercise(new Exercise("Leg Press", "Legs", "Machine", "Beginner", 3, 10))
                .addExercise(new Exercise("Romanian Deadlift", "Hamstrings", "Dumbbells", "Beginner", 3, 10))
                .addExercise(new Exercise("Calf Raises", "Calves", "Machine", "Beginner", 3, 12))
                .build();
    }

    public Workout buildUpperBodyWorkout() {
        return new CustomWorkoutBuilder()
                .setName("Upper Body Workout")
                .setDescription("A balanced upper-body workout for chest, back, shoulders, and arms.")
                .addExercise(new Exercise("Bench Press", "Chest", "Barbell", "Intermediate", 3, 8))
                .addExercise(new Exercise("Lat Pulldown", "Back", "Machine", "Beginner", 3, 10))
                .addExercise(new Exercise("Shoulder Press", "Shoulders", "Dumbbells", "Beginner", 3, 10))
                .addExercise(new Exercise("Bicep Curl", "Arms", "Dumbbells", "Beginner", 3, 12))
                .addExercise(new Exercise("Tricep Pushdown", "Arms", "Cable Machine", "Beginner", 3, 12))
                .build();
    }

    public Workout buildLowerBodyWorkout() {
        return new CustomWorkoutBuilder()
                .setName("Lower Body Workout")
                .setDescription("A balanced lower-body workout for quads, hamstrings, glutes, and calves.")
                .addExercise(new Exercise("Goblet Squat", "Quads", "Dumbbell", "Beginner", 3, 10))
                .addExercise(new Exercise("Leg Press", "Quads", "Machine", "Beginner", 3, 10))
                .addExercise(new Exercise("Romanian Deadlift", "Hamstrings", "Dumbbells", "Beginner", 3, 10))
                .addExercise(new Exercise("Glute Bridge", "Glutes", "Bodyweight", "Beginner", 3, 12))
                .addExercise(new Exercise("Calf Raises", "Calves", "Machine", "Beginner", 3, 12))
                .build();
    }

    public Workout buildPushWorkout() {
        return new CustomWorkoutBuilder()
                .setName("Push Workout")
                .setDescription("A push-focused workout for chest, shoulders, and triceps.")
                .addExercise(new Exercise("Bench Press", "Chest", "Barbell", "Intermediate", 3, 8))
                .addExercise(new Exercise("Shoulder Press", "Shoulders", "Dumbbells", "Beginner", 3, 10))
                .addExercise(new Exercise("Incline Dumbbell Press", "Chest", "Dumbbells", "Beginner", 3, 10))
                .addExercise(new Exercise("Tricep Pushdown", "Arms", "Cable Machine", "Beginner", 3, 12))
                .build();
    }

    public Workout buildPullWorkout() {
        return new CustomWorkoutBuilder()
                .setName("Pull Workout")
                .setDescription("A pull-focused workout for back and biceps.")
                .addExercise(new Exercise("Lat Pulldown", "Back", "Machine", "Beginner", 3, 10))
                .addExercise(new Exercise("Seated Cable Row", "Back", "Cable Machine", "Beginner", 3, 10))
                .addExercise(new Exercise("Dumbbell Row", "Back", "Dumbbells", "Beginner", 3, 10))
                .addExercise(new Exercise("Bicep Curl", "Arms", "Dumbbells", "Beginner", 3, 12))
                .build();
    }

    public Workout buildShouldersAndArmsWorkout() {
        return new CustomWorkoutBuilder()
                .setName("Shoulders and Arms Workout")
                .setDescription("A workout focused on shoulders, biceps, and triceps.")
                .addExercise(new Exercise("Shoulder Press", "Shoulders", "Dumbbells", "Beginner", 3, 10))
                .addExercise(new Exercise("Lateral Raise", "Shoulders", "Dumbbells", "Beginner", 3, 12))
                .addExercise(new Exercise("Bicep Curl", "Arms", "Dumbbells", "Beginner", 3, 12))
                .addExercise(new Exercise("Tricep Pushdown", "Arms", "Cable Machine", "Beginner", 3, 12))
                .build();
    }
}