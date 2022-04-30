import React, { Component } from 'react'
import { Page, Card } from '@shopify/polaris';
import Table  from './Seller/DataTable';
import { Base } from '../../core';

const options = [
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
];

class Product extends Base {



     
  render() {

    return (
      <Page title="Products">
        Hello From Product
      </Page>
    )
  }

}

export default Product
