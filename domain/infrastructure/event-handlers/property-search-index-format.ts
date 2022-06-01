/** @format */

import { SearchIndex } from '@azure/search-documents';
import { AdditionalAmenities } from '../../../graphql/generated';

export const propertyListingIndexSpec = {
  name: 'property-listings',
  fields: [
    { name: 'id', type: 'Edm.String', searchable: false, key: true },
    {
      name: 'communityId',
      type: 'Edm.String',
      searchable: false,
      filterable: true,
    },
    {
      name: 'name',
      type: 'Edm.String',
      searchable: true,
      filterable: false,
      sortable: true,
      facetable: false,
    },
    {
      name: 'type',
      type: 'Edm.String',
      searchable: false,
      filterable: true,
      sortable: false,
      facetable: true,
    },
    {
      name: 'bedrooms',
      type: 'Edm.Int32',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: true,
    },

    {
      name: 'amenities',
      type: 'Collection(Edm.String)',
      searchable: false,
      filterable: true,
      sortable: false,
      facetable: true,
    },
    {
      name: 'additionalAmenities',
      type: 'Collection(Edm.ComplexType)',
      fields: [
        {
          name: 'category',
          type: 'Edm.String',
          facetable: true,
          filterable: true,
          retrievable: true,
          searchable: false,
          sortable: false,
        },
        {
          name: 'amenities',
          type: 'Collection(Edm.String)',
          facetable: true,
          filterable: true,
          retrievable: true,
          searchable: false,
          sortable: false,
        },
      ],
    },
    {
      name: 'price',
      type: 'Edm.Double',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: false,
    },
    {
      name: 'squareFeet',
      type: 'Edm.Double',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: false,
    },
    {
      name: 'bathrooms',
      type: 'Edm.Double',
      searchable: false,
      filterable: true,
      sortable: true,
      facetable: true,
    },
  ],
} as SearchIndex;

export interface PropertyListingIndexDocument {
  id: string;
  communityId: string;
  name: string;
  type: string;
  bedrooms: number;
  amenities: string[];
  additionalAmenities: {
    category: string;
    amenities: string[];
  }[];
  price: number;
  bathrooms: number;
  squareFeet: number;
}
