/**
 * Base abstract class demonstrating Abstraction and Inheritance.
 * All derived models will share default entity attributes (like ID) 
 * while maintaining their own domain-specific fields.
 */
export abstract class BaseEntity {
  protected id?: string | number;
  protected createdAt?: string;
  protected updatedAt?: string;

  constructor(id?: string | number, createdAt?: string, updatedAt?: string) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId(): string | number | undefined {
    return this.id;
  }

  /**
   * Enforces all derived classes to implement a validation mechanism.
   * This is an example of Polymorphism via Abstract Methods.
   */
  public abstract validate(): string[];

  /**
   * Ensures derived classes provide a localized serialization.
   */
  public abstract toJSON(): Record<string, any>;
}