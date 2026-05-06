package Main;

import Builder.WorkoutBuilder;

public class DefaultWorkout {

    private WorkoutBuilder builder;

    public DefaultWorkout(WorkoutBuilder builder) {
        this.builder = builder;
    }

    public void setBuilder(WorkoutBuilder builder) {
        this.builder = builder;
    }

    public Workout buildUpperBody() {
        return builder
                .setName("Upper Body Workout")
                .addExercise(new Exercise("Bench Press", "Chest", "Medium", "Barbell", 3, 10, 135))
                .addExercise(new Exercise("Shoulder Press", "Shoulders", "Medium", "Dumbbells", 3, 10, 75))
                .addExercise(new Exercise("Bent Over Row", "Back", "Medium", "Barbell", 3, 10, 95))
                .build();
    }

    public Workout buildLowerBody() {
        return builder
                .setName("Lower Body Workout")
                .addExercise(new Exercise("Squat", "Legs", "Hard", "Barbell", 3, 10, 135))
                .addExercise(new Exercise("Lunges", "Legs", "Medium", "Dumbbells", 3, 12, 40))
                .addExercise(new Exercise("Calf Raises", "Legs", "Easy", "Machine", 3, 15, 50))
                .build();
    }

    public Workout buildBack() {
        return builder
                .setName("Back Workout")
                .addExercise(new Exercise("Deadlift", "Back", "Hard", "Barbell", 3, 8, 185))
                .addExercise(new Exercise("Lat Pulldown", "Back", "Medium", "Machine", 3, 10, 100))
                .addExercise(new Exercise("Seated Row", "Back", "Medium", "Machine", 3, 10, 90))
                .build();
    }

    public Workout buildLegs() {
        return builder
                .setName("Leg Workout")
                .addExercise(new Exercise("Squat", "Legs", "Hard", "Barbell", 4, 8, 135))
                .addExercise(new Exercise("Leg Press", "Legs", "Medium", "Machine", 3, 10, 180))
                .addExercise(new Exercise("Leg Curl", "Legs", "Easy", "Machine", 3, 12, 70))
                .build();
    }

    public Workout buildChest() {
        return builder
                .setName("Chest Workout")
                .addExercise(new Exercise("Bench Press", "Chest", "Medium", "Barbell", 3, 10, 135))
                .addExercise(new Exercise("Incline Dumbbell Press", "Chest", "Medium", "Dumbbells", 3, 10, 50))
                .addExercise(new Exercise("Chest Fly", "Chest", "Easy", "Machine", 3, 12, 30))
                .build();
    }

    public Workout buildShouldersNArms() {
        return builder
                .setName("Shoulders and Arms Workout")
                .addExercise(new Exercise("Shoulder Press", "Shoulders", "Medium", "Dumbbells", 3, 10, 75))
                .addExercise(new Exercise("Bicep Curl", "Arms", "Easy", "Dumbbells", 3, 12, 25))
                .addExercise(new Exercise("Tricep Extension", "Arms", "Easy", "Cable", 3, 12, 30))
                .build();
    }
}
