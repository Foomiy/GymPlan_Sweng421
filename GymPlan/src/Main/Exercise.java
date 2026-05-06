package Main;

public class Exercise {
    private String name;
    private String bodyPart;
    private String difficulty;
    private String equipment;
    private int sets;
    private int reps;
    private double weight;
    private boolean isCompleted;
    private String notes;

    public Exercise(String name, String bodyPart, String difficulty, String equipment,
                    int sets, int reps, double weight) {
        this.name = name;
        this.bodyPart = bodyPart;
        this.difficulty = difficulty;
        this.equipment = equipment;
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
        this.isCompleted = false;
        this.notes = "";
    }

    public String getName() {
        return name;
    }

    public String getBodyPart() {
        return bodyPart;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public String getEquipment() {
        return equipment;
    }

    public int getSets() {
        return sets;
    }

    public int getReps() {
        return reps;
    }

    public double getWeight() {
        return weight;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public String getNotes() {
        return notes;
    }

    public String getBodyPartInfo() {
        return bodyPart;
    }

    public void addNote(String note) {
        if (notes.isEmpty()) {
            notes = note;
        } else {
            notes += "\n" + note;
        }
    }

    public void setCompleted(boolean completed) {
        this.isCompleted = completed;
    }

    @Override
    public String toString() {
        return name + " (" + bodyPart + ")" +
                " - Difficulty: " + difficulty +
                ", Equipment: " + equipment +
                ", Sets: " + sets +
                ", Reps: " + reps +
                ", Weight: " + weight +
                ", Completed: " + isCompleted;
    }
}