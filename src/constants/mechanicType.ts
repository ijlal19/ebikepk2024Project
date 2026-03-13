type MechanicTypeValue = 1 | 2;
type MechanicTypeFilter = "all" | MechanicTypeValue;
type MechanicTypeContext = "mechanic" | "dealer";

const MECHANIC_TYPE_OPTIONS: Array<{ value: MechanicTypeValue; mechanicLabel: string; dealerLabel: string }> = [
    {
        value: 1,
        mechanicLabel: "Motor Mechanic",
        dealerLabel: "Motorcycle Dealer"
    },
    {
        value: 2,
        mechanicLabel: "Electric Bike Mechanic",
        dealerLabel: "Electric Bike Dealer"
    }
];

function normalizeMechanicType(value: any): MechanicTypeValue {
    return Number(value) === 2 ? 2 : 1;
}

function getMechanicTypeLabel(value: any, context: MechanicTypeContext) {
    const normalizedValue = normalizeMechanicType(value);
    const selectedOption = MECHANIC_TYPE_OPTIONS.find((option) => option.value === normalizedValue);

    if (!selectedOption) {
        return context === "dealer" ? "Motorcycle Dealer" : "Motor Mechanic";
    }

    return context === "dealer" ? selectedOption.dealerLabel : selectedOption.mechanicLabel;
}

function getMechanicTypeFilterOptions(context: MechanicTypeContext) {
    return [
        {
            value: "all" as const,
            label: context === "dealer" ? "All Dealers" : "All Mechanics"
        },
        ...MECHANIC_TYPE_OPTIONS.map((option) => ({
            value: option.value,
            label: context === "dealer" ? option.dealerLabel : option.mechanicLabel
        }))
    ];
}

function matchesMechanicType(item: any, selectedType: MechanicTypeFilter) {
    if (selectedType === "all") {
        return true;
    }

    return normalizeMechanicType(item?.mechanic_type) === selectedType;
}

export {
    MECHANIC_TYPE_OPTIONS,
    normalizeMechanicType,
    getMechanicTypeLabel,
    getMechanicTypeFilterOptions,
    matchesMechanicType
};

export type {
    MechanicTypeValue,
    MechanicTypeFilter,
    MechanicTypeContext
};
