export interface DataAccess<T> {
    add(t: T): Promise<void>,
    delete(id: number): Promise<void>,
    update(id: number, updateData: Partial<T>): Promise<void>,
    getALL(text?: string, from?: number, to?: number):Promise<Partial<T>[]>
}

