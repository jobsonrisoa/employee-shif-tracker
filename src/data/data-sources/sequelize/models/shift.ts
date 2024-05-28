import { DataTypes, Model, Sequelize } from "sequelize";

export class Shift extends Model {
  public id!: number;
  public startShift!: Date;
  public endShift!: Date | null;
  public employeeId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Shift.belongsTo(models.Employee, {
      foreignKey: "employeeId",
      as: "employee",
    });
  }
}

export const initShiftModel = (sequelize: Sequelize) => {
  Shift.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      startShift: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endShift: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      employeeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Shift",
      tableName: "shifts",
      timestamps: true,
    }
  );
};
