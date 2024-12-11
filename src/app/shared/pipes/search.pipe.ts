
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchTerm: string): any[] {
    // Check if products is an array and searchTerm is defined
    if (!Array.isArray(products) || !searchTerm) {
      return products; // Return the original array if conditions aren't met
    }

    // Perform case-insensitive filtering on the array
    return products.filter((product) =>
      product?.title?.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  }
}
