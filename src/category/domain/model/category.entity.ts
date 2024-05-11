export class CategoryEntity {
  constructor(partial: Partial<CategoryEntity>) {
    Object.assign(this, partial);
  }
}
