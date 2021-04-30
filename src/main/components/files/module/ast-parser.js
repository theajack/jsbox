/*
 * @Author: tackchen
 * @Date: 2021-04-30 19:44:23
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-30 19:54:32
 * @FilePath: \jsbox\src\main\components\files\module\ast-parser.js
 * @Description: Coding something
 */

export const AST_TYPE = {
    ExpressionStatement: 'ExpressionStatement',
    ReturnStatement: 'ReturnStatement',
    BlockStatement: 'BlockStatement',
    IfStatement: 'IfStatement',
    SwitchCase: 'SwitchCase',

    VariableDeclaration: 'VariableDeclaration',
    FunctionDeclaration: 'FunctionDeclaration',

    CallExpression: 'CallExpression',
    ObjectExpression: 'ObjectExpression',
    LogicalExpression: 'LogicalExpression',
    MemberExpression: 'MemberExpression',
    ConditionalExpression: 'ConditionalExpression',
    BinaryExpression: 'BinaryExpression',
    AssignmentExpression: 'AssignmentExpression',
    ArrayExpression: 'ArrayExpression',
    OptionalCallExpression: 'AssignmentExpression',
    
    Identifier: 'Identifier',
    Literal: 'Literal',
};