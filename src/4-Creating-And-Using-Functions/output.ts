import { productsURL } from "../lib";

const prefix = '🐉 ';

type ProductType = {
  id: number,
  name: string,
  icon?: string;
}

export default async function updateOutput(id: string){
  const products = await getProducts();
  const output = document.querySelector(`#${id}`)
  const html = layoutProducts(products);

  if(output && html){
    output.innerHTML = html;
  }
}

function layoutProducts(products: ProductType[]) {
  const items = products.map(({ id, name, icon }) => {
    const productHtml = `
    <span class="card-id">#${id}</span>
      <i class="card-icon ${icon} fa-lg"></i>
    <span class="card-name">${name}</span>
    `;
    const cardHtml = `
    <li>
        <div class="card">
            <div class="card-content">
                <div class="content">
                ${productHtml}
                </div>
            </div>
        </div>
    </li>
    `;
    return cardHtml;
  });
  let productsHtml = `<ul>${items.join('')}</ul>`;
  return productsHtml;
}

async function getProducts(): Promise<ProductType[]>{
  const response: Response = await fetch(productsURL);
  const products: ProductType[] = await response.json();
  return products;
}

//run our samples
runTheLearningSamples();

function runTheLearningSamples(){
  function displayProductInfo(id:number, name:string){
    console.log(`${prefix} typed parameters`);
    console.log(`product id = ${id} and name = ${name}`);
  }

  displayProductInfo(10, 'Pizza');

  console.log(`${prefix} function declaration`);
  console.log(addNumbersDeclaration(5,89));

  function addNumbersDeclaration(x: number, y: number){
    const sum: number = x + y;
    return sum;
  }

  const addNumbersExpression = function(x: number, y:number){
    const sum: number = x + y;
    return sum;
  }

  console.log(`${prefix} function expression`);
  console.log(addNumbersExpression(3, 12));

  /*
    when we declare a function we can call it before it declared
    but when we use function expression we have to call it after when
    we create it. this is importend 
  */

    const sampelProducts = [
      {
        id:10,
        name:'Pizza Slice',
        icon:'fas fa-pizza-slice'
      },
      {
        id:20,
        name:'Ice Cream',
        icon:'fas fa-ice-cream'
      },
      {
        id:30,
        name:'Cheese',
        icon:'fas fa-cheese'
      }
    ];

    function getProductNames(): string[]{
      return sampelProducts.map((p) => p.name);
    }

    console.log(`${prefix} return array`);
    console.log(getProductNames());

    function getProductById(id: number) : ProductType | undefined{
      /*
      return sampelProducts.find(
        function (p) { return  id === p.id }
      );
      */
     // => means return the result. we can remove the () in p but 
     return sampelProducts.find((p) => id === p.id)
    }

    /*
    we can also define a function like this
    const getProductById2 = function (id: number): ProductType | undefined{
      return sampelProducts.find((p) => id === p.id);
    }

    const getProductById3 = (id: number): ProductType | undifined => 
      sampleProducts.find((p) => id === p.id);
    */
    console.log(`${prefix} return array`);
    console.log(getProductById(10));

    function displayProducts(products: ProductType[]) : void{
      const productNames = products.map(p => {
        const name = p.name.toLowerCase();
        return name;
      });
      const msg = `Sample products include ${productNames.join(',')}`;
      console.log(`${prefix} return array`);
      console.log(msg);
    }

    displayProducts(sampelProducts);

    //const getRandomId = (max: number) => Math.floor(Math.random() * max)
    const {floor, random} = Math; //Destructing parameters
    const getRandomId = (max: number) => floor(random() * max)

    function createProduct(name: string, icon?: string){
      const id = getRandomId(1000);
      return {
        id, name, icon
      };
    }

    console.log(`${prefix} Optional parameters`);
    let pineapple = createProduct('pineapple','pine-apple.jpg');
    let mango = createProduct('mango');
    console.log(pineapple, mango);

    function buildAddress(street: string, city:string, ...restOfAddress: string[]){
      //console.table(restOfAddress);
      const address = `${street} ${city} ${restOfAddress.join(' ')}`;
      return address;
    }

    const someAddress = buildAddress(
      '1 lois lane',
      'smallville',
      'apt 101',
      'area 51',
      'mystery country');

    console.log(`${prefix} Rest parameters`);
    console.log(someAddress);

    /*
      Destructing parameters means that we dont need to require 
      one variable with the type of ProductType. Instead of product: ProductType
      we can use {id, name}.
      Because TS nows that the variable will be the type of ProductType and it will
      have the same properties like ProductType
    */

    function displayProduct({id, name}: ProductType): void{
      console.log(`${prefix} Destructing parameters`);
      //console.log(`${product.id}`);
      console.log(`Product id=${id} and name=${name}`);
    }

    const prod = getProductById(10);
    if(prod){
      displayProduct(prod);
    }
}