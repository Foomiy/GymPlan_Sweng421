package Filter;

import java.util.ArrayList;
import java.util.List;

import Main.Exercise;

public class BodyPartFilter implements ExerciseFilter {

    private String bodyPart;

    public BodyPartFilter(String bodyPart) {
        this.bodyPart = bodyPart;
    }

    @Override
    public List<Exercise> filter(List<Exercise> exercises) {
        List<Exercise> result = new ArrayList<>();

        for (Exercise e : exercises) {
            if (e.getBodyPart().equalsIgnoreCase(bodyPart)) {
                result.add(e);
            }
        }

        return result;
    }
}