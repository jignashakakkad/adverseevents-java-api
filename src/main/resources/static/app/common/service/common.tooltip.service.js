(function () {
    function ToolTipService() {
    }
    ToolTipService.prototype.getToolTip = function (displayName) {
        if (displayName === 'Primary Suspect Reports') {
            return "Primary Suspect Reports ...";
        } else if (displayName === 'Weighted Rxscore') {
            return "Weighted Rxscore is the ...";
        } else if (displayName === 'Product Name(s)') {
            return "Product Name(s) placeholder text...";
        } else if (displayName === '2013 Revenue') {
            return "2013 Revenue";
        } else if (displayName === 'Primary Suspect Cases') {
            return 'Explanatory Tip Text for Primary Suspect Cases';
        } else if (displayName === 'Generic') {
            return "Generic popover placeholder text...";
        } else if (displayName === 'Generic Competition') {
            return "Generic Competition";
        } else if (displayName === 'AE Parent Company') {
            return "AE Parent Company placeholder";
        } else if (displayName === 'Branded/Generic') {
            return 'Explanatory Tip Text for Branded/Generic';
        } else if (displayName === 'Generic') {
            return "Generic popover placeholder text...";
        } else if (displayName === 'Primary Indication') {
            return "Primary Indication means...";
        } else if (displayName === 'RxScore') {
            return 'Explanatory Tip Text for RxScore';
        } else if (displayName === 'RxSignal') {
            return 'AEI’s proprietary signaling system which predicts future drug label changes.  “Active” means the signal is active and the adverse event shown will likely be added to the drug’s label in the future.';
        } else if (displayName === 'IME') {
            return 'Serious according to the IME (Important Medical Event) list created by the EudraVigilance Expert Working Group (EV-EWG).';
        } else if (displayName === 'Adverse Event') {
            return "MedDRA Adverse Event";
        } else if (displayName === 'Branded/Generic') {
            return 'Explanatory Tip Text for Branded/Generic';
        } else if (displayName === 'Generic') {
            return "Generic popover placeholder text...";
        } else if (displayName === 'Generic Competition') {
            return "Generic Competition";
        } else if (displayName === 'AE Parent Company') {
            return "AE Parent Company placeholder";
        } else if (displayName === 'Branded/Generic') {
            return 'Explanatory Tip Text for Branded/Generic';
        } else if (displayName === 'Generic') {
            return "Generic popover placeholder text...";
        } else if (displayName === 'Adverse Event') {
            return "MedDRA Adverse Event";
        } else if (displayName === 'Adverse Event') {
            return 'Explanatory Tip Text for Suspect Cases Here';
        } else if (displayName === 'RxSignal') {
            return 'AEI’s proprietary signaling system which predicts future drug label changes.  “Active” means the signal is active and the adverse event shown will likely be added to the drug’s label in the future.';
        } else if (displayName === 'IME') {
            return 'Serious according to the IME (Important Medical Event) list created by the EudraVigilance Expert Working Group (EV-EWG).';
        } else if (displayName === 'IME Serious') {
            return 'Serious according to the IME (Important Medical Event) list created by the EudraVigilance Expert Working Group (EV-EWG). ';
        } else if (displayName === 'DME') {
            return 'Event shown is on the Designated Medical Event list, the most serious type of event as classified by the FDA.  ';
        } else if (displayName === 'Disease Related') {
            return 'Adverse Event listed is the actual disease or condition which the drug is indicated to treat.  ';
        } else if (displayName === 'On Label') {
            return 'The event shown or equivalent of the event shown is either on or off the latest drug label.';
        } else if (displayName === 'Label Section') {
            return 'These are the distinct FDA Structured Product Label sections of the drugs label where this term occurs as a know side effect.';
        } else if (displayName === 'ROR') {
            return 'Score which measures the relative occurrence of this adverse event with this drug compared to this adverse event’s relative occurrence with all other drugs in the database.  ';
        } else if (displayName === 'PRR') {
            return 'Explanatory Tip Text  Here';
        } else if (displayName === 'Cases') {
            return 'Number of case reports where adverse event was associated with this drug and the reporter listed the drug as the primary suspected cause.';
        } else if (displayName === 'PS PCT') {
            return 'Primary Suspect Cases for adverse event as a percentage of all Primary Suspect Case Reports for the Drug.';
        } else if (displayName === 'Total Cases') {
            return 'The number of case reports where this adverse event was associated with this drug.  ';
        } else if (displayName === 'Total PCT') {
            return 'Total Cases for adverse event as a percentage of the Total Case Reports for the Drug.';
        } else if (displayName === 'Incidence 2012') {
            return 'Annual incidence rate of this adverse event (primary suspect cases only) for 2012.';
        } else if (displayName === 'Incidence 2011') {
            return 'Annual incidence rate of this adverse event (primary suspect cases only) for 2011.';
        } else if (displayName === 'Incidence 2013') {
            return 'Annual incidence rate of this adverse event (primary suspect cases only) for 2013.';
        } else if (displayName === 'Incidence') {
            return 'Avg Annual incidence rate of this adverse event over the last 3 full calendar years based on patient population data supplied by Evaluate Limited.   ';
        } else if (displayName === 'Adverse Event') {
            return 'Explanatory Tip Text for Suspect Cases Here';
        } else if (displayName === 'RxSignal') {
            return 'AEI’s proprietary signaling system which predicts future drug label changes.  “Active” means the signal is active and the adverse event shown will likely be added to the drug’s label in the future.';
        } else if (displayName === 'IME') {
            return 'Serious according to the IME (Important Medical Event) list created by the EudraVigilance Expert Working Group (EV-EWG).';
        } else if (displayName === 'IME Serious') {
            return 'Serious according to the IME (Important Medical Event) list created by the EudraVigilance Expert Working Group (EV-EWG). ';
        } else if (displayName === 'DME') {
            return 'Event shown is on the Designated Medical Event list, the most serious type of event as classified by the FDA.  ';
        } else if (displayName === 'Disease Related') {
            return 'Adverse Event listed is the actual disease or condition which the drug is indicated to treat.  ';
        } else if (displayName === 'On Label') {
            return 'The event shown or equivalent of the event shown is either on or off the latest drug label.';
        } else if (displayName === 'Label Section') {
            return 'These are the distinct FDA Structured Product Label sections of the drugs label where this term occurs as a know side effect.';
        } else if (displayName === 'ROR') {
            return 'Score which measures the relative occurrence of this adverse event with this drug compared to this adverse event’s relative occurrence with all other drugs in the database.  ';
        } else if (displayName === 'PRR') {
            return 'Explanatory Tip Text  Here';
        } else if (displayName === 'Cases') {
            return 'Number of case reports where adverse event was associated with this drug and the reporter listed the drug as the primary suspected cause.';
        } else if (displayName === 'PS PCT') {
            return 'Primary Suspect Cases for adverse event as a percentage of all Primary Suspect Case Reports for the Drug.';
        } else if (displayName === 'Total Cases') {
            return 'The number of case reports where this adverse event was associated with this drug.  ';
        } else if (displayName === 'Total PCT') {
            return 'Total Cases for adverse event as a percentage of the Total Case Reports for the Drug.';
        } else if (displayName === 'Incidence 2012') {
            return 'Annual incidence rate of this adverse event (primary suspect cases only) for 2012.';
        } else if (displayName === 'Incidence 2011') {
            return 'Annual incidence rate of this adverse event (primary suspect cases only) for 2011.';
        } else if (displayName === 'Incidence 2013') {
            return 'Annual incidence rate of this adverse event (primary suspect cases only) for 2013.';
        } else if (displayName === 'Incidence') {
            return 'Avg Annual incidence rate of this adverse event over the last 3 full calendar years based on patient population data supplied by Evaluate Limited.   ';
        } else {
            return {};
        }
    };
    angular.module('common.services').service('tooltipService', ToolTipService);
})();
