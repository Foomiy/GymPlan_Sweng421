package Filter;

import java.util.ArrayList;
import java.util.List;

import Main.Exercise;

public class EquipmentFilter implements ExerciseFilter {

    private String equipment;

    public EquipmentFilter(String equipment) {
        this.equipment = equipment;
    }

    @Override
    public List<Exercise> filter(List<Exercise> exercises) {
        List<Exercise> result = new ArrayList<>();

        for (Exercise e : exercises) {
            if (e.getEquipment().equalsIgnoreCase(equipment)) {
                result.add(e);
            }
        }

        return result;
    }
}
