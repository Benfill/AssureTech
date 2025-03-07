/* eslint-disable @typescript-eslint/no-explicit-any */
const StorageKeys = {
    SESSION_USER: 'SESSION_USER',
  } as const;
  
  export type StorageKeysType = (typeof StorageKeys)[keyof typeof StorageKeys];
  
  class StorageUtility {
    static setItem<T>(key: StorageKeysType, value: T): void {
      try {
        const jsonValue = JSON.stringify(value);
        localStorage.setItem(key, jsonValue);
      } catch (e) {
        console.log(e);
        
      }
    }
  
    static getItem<T>(key: StorageKeysType): T | null {
      try {
        const jsonValue = localStorage.getItem(key);
        const value = jsonValue != null ? JSON.parse(jsonValue) : null;
        return value;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  
    static removeItem(key: StorageKeysType): void {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.log(e);
      }
    }
  
    static clear(): void {
      try {
        localStorage.clear();
      } catch (error) {
        console.log(error);
      }
    }
  
    static getMultipleItems(
      keys: Array<StorageKeysType>,
    ): Record<StorageKeysType, any> | undefined {
      try {
        const result = localStorage.multiGet(keys);
        const final = result.reduce(
          (pre: any, curr: any[]) => {
            const val = curr[1] ? JSON.parse(curr[1]) : null;
            return {
              ...pre,
              [curr[0]]: val,
            };
          },
          {} as Record<StorageKeysType, any>,
        );
        return final;
      } catch (err) {
        console.log(err);
      }
    }
  }
  
  export { StorageUtility, StorageKeys };