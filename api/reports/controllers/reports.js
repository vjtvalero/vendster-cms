'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const sales = async ctx => {
    const result = await strapi.query('transactions').model.query().sum('amount')
    return parseAmount(result)
}

const assets = async ctx => {
    const result = await strapi.query('products').model.query().sum('capital')
    return parseAmount(result)
}

const cash = async ctx => {
    const result = await strapi.query('funds').model.query().sum('amount')
    return parseAmount(result)
}

const profit = async ctx => {
    let sales = await strapi.query('transactions').model.query().sum('amount')
    let assets = await strapi.query('products').model.query().sum('capital')
    let cash = await strapi.query('funds').model.query().sum('amount')
    sales = parseAmount(sales)
    assets = parseAmount(assets)
    cash = parseAmount(cash)
    const allMoney = cash.amount + sales.amount
    const profit = allMoney - assets.amount
    return { amount: profit }
}

const parseAmount = result => {
    let amount = 0
    if (result && result.length > 0) {
        const row = result[0]
        for (const prop in row) {
            if (row[prop]) {
                amount = row[prop]
            }
            break
        }
    }
    return { amount }
}

module.exports = {
    sales,
    assets,
    cash,
    profit
};