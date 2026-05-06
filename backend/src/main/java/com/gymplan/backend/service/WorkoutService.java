package com.gymplan.backend.service;

import com.gymplan.backend.model.Exercise;
import com.gymplan.backend.model.Workout;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class WorkoutService {

    public Workout getChestWorkout() {
        return new Workout(
                "Chest Workout",
                "A beginner-friendly chest workout focused on pressing movements.",
                List.of(
                        new Exercise("Bench Press", "Chest", "Barbell", "Intermediate", 3, 8),
                        new Exercise("Incline Dumbbell Press", "Chest", "Dumbbells", "Beginner", 3, 10),
                        new Exercise("Push-Ups", "Chest", "Bodyweight", "Beginner", 3, 12),
                        new Exercise("Cable Fly", "Chest", "Cable Machine", "Beginner", 3, 12)
                )
        );
    }

    public Workout getBackWorkout() {
        return new Workout(
                "Back Workout",
                "A beginner-friendly back workout focused on pulling movements.",
                List.of(
                        new Exercise("Lat Pulldown", "Back", "Machine", "Beginner", 3, 10),
                        new Exercise("Seated Cable Row", "Back", "Cable Machine", "Beginner", 3, 10),
                        new Exercise("Dumbbell Row", "Back", "Dumbbells", "Beginner", 3, 10),
                        new Exercise("Back Extension", "Back", "Bodyweight", "Beginner", 3, 12)
                )
        );
    }

    public Workout getLegWorkout() {
        return new Workout(
                "Leg Workout",
                "A beginner-friendly leg workout focused on lower-body strength.",
                List.of(
                        new Exercise("Squat", "Legs", "Barbell", "Intermediate", 3, 8),
                        new Exercise("Leg Press", "Legs", "Machine", "Beginner", 3, 10),
                        new Exercise("Romanian Deadlift", "Hamstrings", "Dumbbells", "Beginner", 3, 10),
                        new Exercise("Calf Raises", "Calves", "Machine", "Beginner", 3, 12)
                )
        );
    }

    public Workout getUpperBodyWorkout() {
        return new Workout(
                "Upper Body Workout",
                "A balanced upper-body workout for chest, back, shoulders, and arms.",
                List.of(
                        new Exercise("Bench Press", "Chest", "Barbell", "Intermediate", 3, 8),
                        new Exercise("Lat Pulldown", "Back", "Machine", "Beginner", 3, 10),
                        new Exercise("Shoulder Press", "Shoulders", "Dumbbells", "Beginner", 3, 10),
                        new Exercise("Bicep Curl", "Arms", "Dumbbells", "Beginner", 3, 12),
                        new Exercise("Tricep Pushdown", "Arms", "Cable Machine", "Beginner", 3, 12)
                )
        );
    }

    public Workout getLowerBodyWorkout() {
        return new Workout(
                "Lower Body Workout",
                "A balanced lower-body workout for quads, hamstrings, glutes, and calves.",
                List.of(
                        new Exercise("Goblet Squat", "Quads", "Dumbbell", "Beginner", 3, 10),
                        new Exercise("Leg Press", "Quads", "Machine", "Beginner", 3, 10),
                        new Exercise("Romanian Deadlift", "Hamstrings", "Dumbbells", "Beginner", 3, 10),
                        new Exercise("Glute Bridge", "Glutes", "Bodyweight", "Beginner", 3, 12),
                        new Exercise("Calf Raises", "Calves", "Machine", "Beginner", 3, 12)
                )
        );
    }
    public Workout getPushWorkout() {
    return new Workout(
            "Push Workout",
            "A push-focused workout for chest, shoulders, and triceps.",
            List.of(
                    new Exercise("Bench Press", "Chest", "Barbell", "Intermediate", 3, 8),
                    new Exercise("Shoulder Press", "Shoulders", "Dumbbells", "Beginner", 3, 10),
                    new Exercise("Incline Dumbbell Press", "Chest", "Dumbbells", "Beginner", 3, 10),
                    new Exercise("Tricep Pushdown", "Arms", "Cable Machine", "Beginner", 3, 12)
            )
    );
}

public Workout getPullWorkout() {
    return new Workout(
            "Pull Workout",
            "A pull-focused workout for back and biceps.",
            List.of(
                    new Exercise("Lat Pulldown", "Back", "Machine", "Beginner", 3, 10),
                    new Exercise("Seated Cable Row", "Back", "Cable Machine", "Beginner", 3, 10),
                    new Exercise("Dumbbell Row", "Back", "Dumbbells", "Beginner", 3, 10),
                    new Exercise("Bicep Curl", "Arms", "Dumbbells", "Beginner", 3, 12)
            )
    );
}

public Workout getShouldersAndArmsWorkout() {
    return new Workout(
            "Shoulders and Arms Workout",
            "A workout focused on shoulders, biceps, and triceps.",
            List.of(
                    new Exercise("Shoulder Press", "Shoulders", "Dumbbells", "Beginner", 3, 10),
                    new Exercise("Lateral Raise", "Shoulders", "Dumbbells", "Beginner", 3, 12),
                    new Exercise("Bicep Curl", "Arms", "Dumbbells", "Beginner", 3, 12),
                    new Exercise("Tricep Pushdown", "Arms", "Cable Machine", "Beginner", 3, 12)
            )
    );
}
}