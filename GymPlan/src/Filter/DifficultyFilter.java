package Filter;

import java.util.ArrayList;
import java.util.List;

import Main.Exercise;

public class DifficultyFilter implements ExerciseFilter {

    private String difficulty;

    public DifficultyFilter(String difficulty) {
        this.difficulty = difficulty;
    }

    @Override
    public List<Exercise> filter(List<Exercise> exercises) {
        List<Exercise> result = new ArrayList<>();

        for (Exercise e : exercises) {
            if (e.getDifficulty().equalsIgnoreCase(difficulty)) {
                result.add(e);
            }
        }

        return result;
    }
}
