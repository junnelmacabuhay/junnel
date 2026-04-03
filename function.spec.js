/**
 * SPEC TEMPLATE - Function/Component Specification
 * 
 * Use this template for unit-level specifications.
 */

module.exports = {
  name: 'calculateDiscount',
  type: 'function',
  description: 'Calculates discount amount based on price and discount percentage',
  
  inputs: [
    {
      name: 'price',
      type: 'number',
      required: true,
      constraints: 'Must be positive, up to 2 decimal places',
    },
    {
      name: 'discountPercent',
      type: 'number',
      required: true,
      constraints: 'Must be 0-100',
    },
  ],
  
  output: {
    type: 'number',
    description: 'Discount amount in same currency as price',
    constraints: 'Rounded to 2 decimal places',
  },
  
  examples: [
    {
      input: { price: 100, discountPercent: 10 },
      output: 10,
    },
    {
      input: { price: 99.99, discountPercent: 15 },
      output: 15.00,
    },
  ],
  
  validBehaviors: [
    'Returns exact discount amount',
    'Handles decimal prices correctly',
    'Rounds to 2 decimal places',
  ],
  
  invalidBehaviors: [
    'Throws error for negative price',
    'Throws error for discount > 100',
    'Throws error for non-numeric inputs',
  ],
};
