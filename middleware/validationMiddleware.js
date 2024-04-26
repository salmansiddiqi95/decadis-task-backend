const { validationResult } = require('express-validator');
const ActionsEnums = require('../enums/actionsEnum');

exports.validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

exports.validateAction = (req, res, next) => {
    const { actions } = req.body;

    // Ensure actions is an array
    if (!Array.isArray(actions)) {
        return res.status(400).json({
            errors: [{
                type: 'field',
                msg: 'Actions must be an array',
                param: 'actions',
                location: 'body'
            }]
        });
    }

    // Check if any action is invalid
    const invalidActions = actions.filter(action => !Object.values(ActionsEnums).includes(action));

    if (invalidActions.length > 0) {
        return res.status(400).json({
            errors: invalidActions.map(action => ({
                type: 'field',
                value: Object.values(ActionsEnums),
                msg: `Invalid action: ${action}`,
                param: 'actions',
                location: 'body'
            }))
        });
    }
    next();
};
