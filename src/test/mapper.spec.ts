import { Mapper } from "../mapper";
import { Entity } from "../entities/entity";
import { User } from "../entities/user";
import { Category } from "../entities/category";

// { pick: { single: ['name', 'id'], object: { subCategory: ['name', 'description'] }, array: { rewards: ['desc','idNum']} }, { rename: { name: 'nombre', entitties:  { id: 'key', name: 'nombre' } } }}
describe('Dynamic mapper testing', () => {
    it('should map all entity props', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            image: '',
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            orderHighlight: 1,
            imageHighlight: '',
            orderNovelty: 1,
            createdAt: new Date,
            updatedAt: new Date,
            createdByUser: '',
            updatedByUser: '',
            partner: {},
            category: {},
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }
        const mapper = new Mapper()
        const result = mapper.mapToCreate<Entity>(new Entity(), data)
        expect(result).toEqual({
            idReward:  1,
            name: '',
            description: '',
            image: '',
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            partner: {},
            category: {},
            subcategory: {},
            ecommerce: {},
            discount: {},
        })
    })
    it('should map only the props that are in the single prps of pick option', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            image: '',
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            orderHighlight: 1,
            imageHighlight: '',
            orderNovelty: 1,
            createdAt: new Date,
            updatedAt: new Date,
            createdByUser: '',
            updatedByUser: '',
            partner: {},
            category: {},
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }
        const mapper = new Mapper()
        const result = mapper.mapToCreate<Entity>(new Entity(), data, { pick: { single: ['name', 'description', 'idReward'] }})
        expect(result).toEqual({
            idReward:  1,
            name: '',
            description: ''
        })
    })
    it('should map only the props that are in the single and complex prps of pick option', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            subCategory: {
                name: '',
                description: ''
            },
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            orderHighlight: 1,
            imageHighlight: '',
            orderNovelty: 1,
            createdAt: new Date,
            updatedAt: new Date,
            createdByUser: '',
            updatedByUser: '',
            partner: {},
            category: {},
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }
        const mapper = new Mapper()
        const result = mapper.mapToCreate<Category>(new Category(), data, { pick: { single: ['name'], complex: { subCategory: ['name', 'description'] } }})
        expect(result).toEqual({
            name: '',
            subCategory: {
                name: '',
                description: ''
            }
        })
    })
    it('should map only the props that are in the single and complex and array props of pick option', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            subCategory: {
                name: '',
                description: ''
            },
            stuff: [
                {
                    id: '',
                    name: ''
                },
                {
                    id: '',
                    name: ''
                }
            ],
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            orderHighlight: 1,
            imageHighlight: '',
            orderNovelty: 1,
            createdAt: new Date,
            updatedAt: new Date,
            createdByUser: '',
            updatedByUser: '',
            partner: {},
            category: {},
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }
        const mapper = new Mapper()
        const result = mapper.mapToCreate<Category>(new Category(), data, { pick: { single: ['name'], complex: { subCategory: ['name', 'description'] }, array: { stuff: ['name', 'id']} }})
        expect(result).toEqual({
            name: '',
            subCategory: {
                name: '',
                description: ''
            },
            stuff: [{name: '', id: ''}, {name: '', id: ''}]
        })
    })
})