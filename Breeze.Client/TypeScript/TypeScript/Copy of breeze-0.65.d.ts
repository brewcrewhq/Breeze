// Type definitions for Breeze 1.0
// Project: http://www.breezejs.com/
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare module BreezeCore {

    interface ErrorCallback {
        (error: Error): void;
    }

    class Enum {
        constructor (name: string, methodObj?: any);

        addSymbol(propertiesObj?: any): EnumSymbol;
        contains(object: any): bool;
        fromName(name: string): EnumSymbol;
        getNames(): string[];
        getSymbols(): EnumSymbol[];
        static isSymbol(object: any): bool;
        seal(): void;
    }

    class EnumSymbol {
        parentEnum: Enum;

        getName(): string;
        toString(): string;
    }

    class Event {
        constructor (name: string, publisher: any, defaultErrorCallback?: ErrorCallback);

        static enable(eventName: string, target: any): void;
        static enable(eventName: string, target: any, isEnabled: bool): void;
        static enable(eventName: string, target: any, isEnabled: Function): void;

        static isEnabled(eventName: string, target: any): bool;
        publish(data: any, publishAsync?: bool, errorCallback?: ErrorCallback): void;
        publishAsync(data: any, errorCallback?: ErrorCallback): void;
        subscribe(callback?: (data: any) => void ): number;
        unsubscribe(unsubKey: number): bool;
    }
}

declare module Breeze {

    interface Entity {
        entityAspect: EntityAspect;
        entityType: EntityType;
    }

    class AutoGeneratedKeyType {
        static Identity: AutoGeneratedKeyType;
        static KeyGenerator: AutoGeneratedKeyType;
        static None: AutoGeneratedKeyType;
    }

    interface DataPropertyOptions {
        name?: string;
        nameOnServer?: string;
        dataType?: DataType;
        isNullable?: bool;
        isPartOfKey?: bool;
        isUnmapped?: bool;
        concurrencyMode?: string;
        maxLength?: number;
        fixedLength?: bool;
        validators?: Validator[];
    }

    class DataProperty {
        concurrencyMode: string;
        dataType: DataType;
        defaultValue: any;
        fixedLength: bool;
        isNullable: bool;
        isPartOfKey: bool;
        isUnmapped: bool;
        maxLength: number;
        name: string;
        parentEntityType: EntityType;
        relatedNavigationProperty: NavigationProperty;
        validators: Validator[];

        constructor (config: DataPropertyOptions);
    }

    class DataType {
        static Binary: DataType;
        static Boolean: DataType;
        static Byte: DataType;
        static DateTime: DataType;
        static Decimal: DataType;
        static Double: DataType;
        static Guid: DataType;
        static Int16: DataType;
        static Int32: DataType;
        static Int64: DataType;
        static Single: DataType;
        static String: DataType;
        static Undefined: DataType;

        defaultValue: any;
        isNumeric: bool;

        static toDataType(typeName: string): DataType;
    }

    class EntityAction {
        static AcceptChanges: EntityAction;
        static Attach: EntityAction;
        static AttachOnImport: EntityAction;
        static AttachOnQuery: EntityAction;
        static Clear: EntityAction;
        static Detach: EntityAction;
        static EntityStateChange: EntityAction;
        static MergeOnImport: EntityAction;
        static MergeOnSave: EntityAction;
        static MergeOnQuery: EntityAction;
        static PropertyChange: EntityAction;
        static RejectChanges: EntityAction;
    }

    class EntityAspect {
        entity: Entity;
        entityManager: EntityManager;
        entityState: EntityState;
        isBeingSaved: bool;
        originalValues: any;

        propertyChanged: BreezeCore.Event;
        validationErrorsChanged: BreezeCore.Event;

        acceptChanges(): void;
        addValidationError(validationError: ValidationError): void;
        getKey(forceRefresh?: bool): EntityKey;

        getValidationErrors(): ValidationError[];
        getValidationErrors(property: string): ValidationError[];
        getValidationErrors(property: DataProperty): ValidationError[];
        getValidationErrors(property: NavigationProperty): ValidationError[];

        loadNavigationProperty(navigationProperty: string, callback?: Function, errorCallback?: Function): Promise;
        loadNavigationProperty(navigationProperty: NavigationProperty, callback?: Function, errorCallback?: Function): Promise;

        rejectChanges(): void;

        removeValidationError(validator: Validator): void;
        removeValidationError(validator: Validator, property: DataProperty): void;
        removeValidationError(validator: Validator, property: NavigationProperty): void;

        setDeleted(): void;
        setModified(): void;
        setUnchanged(): void;
        validateEntity(): bool;

        validateProperty(property: string, context?: any): bool;
        validateProperty(property: DataProperty, context?: any): bool;
        validateProperty(property: NavigationProperty, context?: any): bool;
    }

    class EntityKey {
        constructor (entityType: EntityType, keyValue: any);
        constructor (entityType: EntityType, keyValues: any[]);

        equals(entityKey: EntityKey): bool;
        static equals(k1: EntityKey, k2: EntityKey): bool;
    }

    interface EntityManagerOptions {
        serviceName?: string;
        metadataStore?: MetadataStore;
        queryOptions?: QueryOptions;
        saveOptions?: SaveOptions;
        validationOptions?: ValidationOptions;
        keyGeneratorCtor?: Function;
        remoteAccessImplementation?: RemoteAccessImplementation;
    }

    interface RemoteAccessImplementation {
    }

    interface ExecuteQuerySuccessCallback {
        (data: { results: Entity[]; query: EntityQuery; XHR: XMLHttpRequest; }): void;
    }

    interface ExecuteQueryErrorCallback {
        (error: { query: EntityQuery; XHR: XMLHttpRequest; }): void;
    }

    interface SaveChangesSuccessCallback {
        (saveResult: { entities: Entity[]; keyMappings: any; XHR: XMLHttpRequest; }): void;
    }

    interface SaveChangesErrorCallback {
        (error: { XHR: XMLHttpRequest; }): void;
    }

    interface EntityManagerProperties {
        serviceName?: string;
        queryOptions?: QueryOptions;
        saveOptions?: SaveOptions;
        validationOptions?: ValidationOptions;
        remoteAccessImplementation?: RemoteAccessImplementation;
        keyGeneratorCtor?: Function;
    }

    class EntityManager {
        keyGeneratorCtor: Function;
        metadataStore: MetadataStore;
        queryOptions: QueryOptions;
        remoteAccessImplementation: RemoteAccessImplementation;
        saveOptions: SaveOptions;
        serviceName: string;
        validationOptions: ValidationOptions;

        entityChanged: BreezeCore.Event;
        // hasChanges: BreezeCore.Event;

        constructor (config?: EntityManagerOptions);
        constructor (config?: string);

        addEntity(entity: Entity): Entity;
        attachEntity(entity: Entity, entityState?: EntityState): Entity;
        clear(): void;
        createEmptyCopy(): EntityManager;
        detachEntity(entity: Entity): bool;

        executeQuery(query: string, callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Promise;
        executeQuery(query: EntityQuery, callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Promise;

        executeQueryLocally(query: EntityQuery): Entity[];
        exportEntities(entities?: Entity[]): string;
        fetchMetadata(callback?: (schema: any) => void , errorCallback?: BreezeCore.ErrorCallback): Promise;
        findEntityByKey(entityKey: EntityKey): Entity;
        generateTempKeyValue(entity: Entity): any;
        getChanges(): Entity[];

        getChanges(entityType: EntityType): Entity[];
        getChanges(entityTypes: EntityType[]): Entity[];

        getEntities(entityTypes: EntityType, entityState?: EntityState): Entity[];
        getEntities(entityTypes?: EntityType[], entityState?: EntityState): Entity[];
        getEntities(entityType?: EntityType, entityStates?: EntityState[]): Entity[];
        getEntities(entityTypes?: EntityType[], entityStates?: EntityState[]): Entity[];

        hasChanges(): bool;
        hasChanges(entityType: EntityType): bool;
        hasChanges(entityTypes: EntityType[]): bool;
        

        static importEntities(exportedString: string, config?: { mergeStrategy?: MergeStrategy; }): EntityManager;
        importEntities(exportedString: string, config?: { mergeStrategy?: MergeStrategy; }): EntityManager;

        rejectChanges(): Entity[];
        saveChanges(entities?: Entity[], saveOptions?: SaveOptions, callback?: SaveChangesSuccessCallback, errorCallback?: SaveChangesErrorCallback): Promise;
        setProperties(config: EntityManagerProperties): void;
    }

    class EntityQuery {
        entityManager: EntityManager;
        orderByClause: OrderByClause;
        queryOptions: QueryOptions;
        resourceName: string;
        skipCount: number;
        takeCount: number;
        wherePredicate: Predicate;

        constructor (resourceName?: string);

        execute(callback?: ExecuteQuerySuccessCallback, errorCallback?: ExecuteQueryErrorCallback): Promise;
        executeLocally(): Entity[];
        expand(propertyPaths: string): EntityQuery;
        static from(resourceName: string): EntityQuery;
        from(resourceName: string): EntityQuery;
        static fromEntities(entity: Entity): EntityQuery;
        static fromEntities(entities: Entity[]): EntityQuery;
        static fromEntityKey(entityKey: EntityKey): EntityQuery;
        static fromEntityNavigation(entity: Entity, navigationProperty: NavigationProperty): EntityQuery;
        orderBy(propertyPaths: string): EntityQuery;
        orderByDesc(propertyPaths: string): EntityQuery;
        select(propertyPaths: string): EntityQuery;
        skip(count: number): EntityQuery;
        take(count: number): EntityQuery;
        top(count: number): EntityQuery;

        using(obj: EntityManager): EntityQuery;
        using(obj: MergeStrategy): EntityQuery;
        using(obj: FetchStrategy): EntityQuery; 

        where(predicate: Predicate): EntityQuery;
        where(property: string, operator: string, value: any): EntityQuery;
        where(property: string, operator: FilterQueryOp, value: any): EntityQuery;
        where(predicate: FilterQueryOp): EntityQuery;
    }

    interface OrderByClause {
    }

    class EntityState {
        static Added: EntityState;
        static Deleted: EntityState;
        static Detached: EntityState;
        static Modified: EntityState;
        static Unchanged: EntityState;

        isAdded(): bool;
        isAddedModifiedOrDeleted(): bool;
        isDeleted(): bool;
        isDetached(): bool;
        isModified(): bool;
        isUnchanged(): bool;
        isUnchangedOrModified(): bool;
    }

    class EntityType {
        autoGeneratedKeyType: AutoGeneratedKeyType;
        concurrencyProperties: DataProperty[];
        dataProperties: DataProperty[];
        defaultResourceName: string;
        foreignKeyProperties: DataProperty[];
        keyProperties: DataProperty[];
        metadataStore: MetadataStore;
        name: string;
        namespace: string;
        navigationProperties: NavigationProperty[];
        shortName: string;
        unmappedProperties: DataProperty[];
        validators: Validator[];

        constructor (config: MetadataStore);
        constructor (config: EntityTypeOptions);

        addProperty(property: DataProperty): void;
        addProperty(property: NavigationProperty): void;
        addValidator(validator: Validator, property?: any): void;
        createEntity(): Entity;
        getDataProperty(propertyName: string): DataProperty;
        getEntityCtor(): Function;
        getNavigationProperty(propertyName: string): NavigationProperty;
        getProperties(): any;
        getProperty(propertyPath: string, throwIfNotFound?: bool): any;
        getPropertyNames(): string[];
        setProperties(config: EntityTypeProperties): void;
        toString(): string;
    }

    interface EntityTypeOptions {
        metadataStore?: MetadataStore;
        serviceName?: string;
        shortName?: string;
        namespace?: string;
        defaultResourceName?: string;
    }

    interface EntityTypeProperties {
        autogeneratedKeyType?: AutoGeneratedKeyType;
        defaultResourceName?: string;
    }

    class FetchStrategy {
        static FromLocalCache: FetchStrategy;
        static FromServer: FetchStrategy;
    }

    class FilterQueryOp {
        static Contains: FilterQueryOp;
        static EndsWith: FilterQueryOp;
        static Equals: FilterQueryOp;
        static GreaterThan: FilterQueryOp;
        static GreaterThanOrEqual: FilterQueryOp;
        static LessThan: FilterQueryOp;
        static LessThanOrEqual: FilterQueryOp;
        static NotEquals: FilterQueryOp;
        static StartsWith: FilterQueryOp;
    }

    class LocalQueryComparisonOptions {
        static caseInsensitiveSQL: LocalQueryComparisonOptions;
        static defaultInstance: LocalQueryComparisonOptions;

        constructor (config: { name?: string; isCaseSensitive?: bool; usesSql92CompliantStringComparison?: bool; });

        setAsDefault(): void;
    }

    class MergeStrategy {
        static OverwriteChanges: MergeStrategy;
        static PreserveChanges: MergeStrategy;
    }

    class MetadataStore {
        namingConvention: NamingConvention;

        constructor (config?: MetadataStoreOptions);

        exportMetadata(): string;
        fetchMetadata(serviceName: string, remoteAccessImplementation?: RemoteAccessImplementation, callback?: (data) => void , errorCallback?: BreezeCore.ErrorCallback): Promise;
        getEntityType(entityTypeName: string, okIfNotFound?: bool): EntityType;
        getEntityTypes(): EntityType[];
        hasMetadataFor(serviceName: string): bool;
        static importMetadata(exportedString: string): MetadataStore;
        importMetadata(exportedString: string): MetadataStore;
        isEmpty(): bool;
        registerEntityTypeCtor(entityTypeName: string, entityCtor: Function, initializationFn?: (entity: Entity) =>void ): void;
        trackUnmappedType(entityCtor: Function, interceptor?: Function);
    }

    interface MetadataStoreOptions {
        namingConvention?: NamingConvention;
        localQueryComparisonOptions?: LocalQueryComparisonOptions;
    }

    class NamingConvention {
        static camelCase: NamingConvention;
        static defaultInstance: NamingConvention;
        static none: NamingConvention;

        constructor (config: NamingConventionOptions);

        clientPropertyNameToServer(clientPropertyName: string): string;
        clientPropertyNameToServer(clientPropertyName: string, property: DataProperty): string;
        clientPropertyNameToServer(clientPropertyName: string, property: NavigationProperty): string;

        serverPropertyNameToClient(serverPropertyName: string): string;
        serverPropertyNameToClient(serverPropertyName: string, property: DataProperty): string;
        serverPropertyNameToClient(serverPropertyName: string, property: NavigationProperty): string;

        setAsDefault();
    }

    interface NamingConventionOptions {
        serverPropertyNameToClient?: Function;
        clientPropertyNameToServer?: Function;
    }

    class NavigationProperty {
        associationName: string;
        entityType: EntityType;
        foreignKeyNames: string[];
        inverse: NavigationProperty;
        isDataProperty: bool;
        isNavigationProperty: bool;
        isScalar: bool;
        name: string;
        parentEntityType: EntityType;
        relatedDataProperties: DataProperty[];
        validators: Validator[];

        constructor (config: NavigationPropertyOptions);
    }

    interface NavigationPropertyOptions {
        name?: string;
        nameOnServer?: string;
        entityTypeName: string;
        isScalar?: bool;
        associationName?: string;
        foreignKeyNames?: string[];
        foreignKeyNamesOnServer?: string[];
        validators?: Validator[];
    }

    class Predicate {
        constructor (property: string, operator: string, value: any);
        constructor (property: string, operator: FilterQueryOp, value: any);

        and: PredicateMethod;
        static and: PredicateMethod;

        static create: PredicateMethod;

        static isPredicate(o: any): bool;

        static not(predicate: Predicate): Predicate;
        not(): Predicate;

        static or: PredicateMethod;
        or: PredicateMethod;

        toFunction(): Function;
        toString(): string;
        validate(entityType: EntityType): bool;
    }

    interface PredicateMethod {
        (predicates: Predicate[]): Predicate;
        (...predicates: Predicate[]): Predicate;
        (property: string, operator: string, value: any): Predicate;
        (property: string, operator: FilterQueryOp, value: any): Predicate;
    }

    class Promise {
        fail(errorCallback: Function): Promise;
        fin(finallyCallback: Function): Promise;
        then(callback: Function): Promise;
    }

    class QueryOptions {
        static defaultInstance: QueryOptions;
        fetchStrategy: FetchStrategy;
        mergeStrategy: MergeStrategy;

        constructor (config?: QueryOptionsConfiguration);

        setAsDefault(): void;
        using(config: QueryOptionsConfiguration): QueryOptions;
        using(config: MergeStrategy): QueryOptions;
        // using(config: FetchStrategy): QueryOptions; !!! same signature as MergeStrategy
    }

    interface QueryOptionsConfiguration {
        fetchStrategy?: FetchStrategy;
        mergeStrategy?: MergeStrategy;
    }

    class SaveOptions {
        allowConcurrentSaves: bool;
        static defaultInstance: SaveOptions;

        constructor (config?: { allowConcurrentSaves?: bool; });

        setAsDefault(): SaveOptions;
    }

    class ValidationError {
        context: any;
        errorMessage: string;
        property: any; // DataProperty | NavigationProperty
        validator: Validator;

        constructor (validator: Validator, context: any, errorMessage: string);
    }

    class ValidationOptions {
        static defaultInstance: ValidationOptions;
        validateOnAttach: bool;
        validateOnPropertyChange: bool;
        validateOnQuery: bool;
        validateOnSave: bool;

        constructor (config?: ValidationOptionsConfiguration);

        setAsDefault(): ValidationOptions;
        using(config: ValidationOptionsConfiguration): ValidationOptions;
    }

    interface ValidationOptionsConfiguration {
        validateOnAttach?: bool;
        validateOnSave?: bool;
        validateOnQuery?: bool;
        validateOnPropertyChange?: bool;
    }

    class Validator {
        static messageTemplates: any;

        constructor (name: string, validatorFn: ValidatorFunction, context?: any);

        static bool(): Validator;
        static byte(): Validator;
        static date(): Validator;
        getMessage(): string;
        static guid(): Validator;
        static int16(): Validator;
        static int32(): Validator;
        static int64(): Validator;
        static maxLength(context: { maxLength: number; }): Validator;
        static number(): Validator;
        static required(): Validator;
        static string(): Validator;
        static stringLength(context: { maxLength: number; minLength: number; }): Validator;
    }

    interface ValidatorFunction {
        (value: any, context: ValidatorFunctionContext): void;
    }

    interface ValidatorFunctionContext {
        value: any;
        validatorName: string;
        displayName: string;
        messageTemplate: string;
        message?: string;
    }
}