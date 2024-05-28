import { DataTypes, Model, Sequelize } from "sequelize";

export class Employee extends Model {
  public id!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Employee.hasMany(models.Shift, {
      foreignKey: "employeeId",
      as: "shifts",
    });
  }
}

export const initEmployeeModel = (sequelize: Sequelize) => {
  Employee.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Employee",
      tableName: "employees",
      timestamps: true,
    }
  );
};
