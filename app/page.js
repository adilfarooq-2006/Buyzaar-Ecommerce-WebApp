"use client"
import Image from "next/image";
import Timer from "@/components/Timer";
import { products } from '@/data/products';
import Link from 'next/link';

export default function Home() {
  // Filter out a few products for the deals section (secondsection)
  const dealProducts = [...products].slice(0, 4);

  // Get home and outdoor products for thirdsection (using some products)
  const homeProducts = [...products].slice(1, 9);

  // Get tech products for fourthsec (using some products)
  const techProducts = [...products].slice(3, 11);

  // Get recommended products
  const recommendedProducts = [...products]
    .sort(() => 0.5 - Math.random()) // shuffle the array
    .slice(0, 10); // take first 10 items

  return (
    <>
      <div>
        <div className="bar h-14 p-2 px-20 bg-white mt-3 flex justify-between items-center">
          <div className="one ">
            <ul className="flex gap-4">
              <Link href={"/products"}>
                <span className="flex gap-2">
                  <Image src="/hamburger.svg" alt="arrow-down" width={20} height={20} />
                  All Catogaries
                </span>
              </Link>
              <Link href={"/products"}><li>Hot offers</li></Link>
              <Link href={"/products"}><li>Gift box</li></Link>
              <Link href={"/products"}><li>Products</li></Link>
              <span className="flex gap-2">Help
                <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} />
              </span>
            </ul>

          </div>
          <div className="two flex gap-4 items-center">

            <span className="flex gap-2">English, USD
              <Image src="/downarrow.svg" alt="arrow-down" width={10} height={10} /></span>
            <span>
              Ship to
            </span>
            <Link href="/dashboard">
              <span className="hover:bg-blue-500 bg-blue-100 hover:font-medium hover:text-white transition-all hover:cursor-pointer p-2 rounded-md px-3">
                Admin Console
              </span>
            </Link>
          </div>
        </div>

        <div className="firstsection mt-3  gap-5 mx-20 rounded-md  bg-white flex p-2">
          <div className="first flex flex-col w-1/4 px-4">
            <span className="hover:bg-blue-100  p-2 hover:font-medium hover:rounded-md">Automobiles</span>
            <span className="hover:bg-blue-100  p-2 hover:font-medium hover:rounded-md">Mobile phones</span>
            <span className="hover:bg-blue-100  p-2 hover:font-medium hover:rounded-md">Clothes and wear</span>
            <span className="hover:bg-blue-100  p-2 hover:font-medium hover:rounded-md">Home interiors</span>
            <span className="hover:bg-blue-100  p-2 hover:font-medium hover:rounded-md">Computer and tech</span>
            <span className="hover:bg-blue-100  p-2 hover:font-medium hover:rounded-md">Sports and fitness</span>
            <span className="hover:bg-blue-100  p-2 hover:font-medium hover:rounded-md">Beauty and health</span>
            <span className="hover:bg-blue-100  p-2 hover:font-medium hover:rounded-md">Baby and child</span>
            <span className="hover:bg-blue-100  p-2 hover:font-medium hover:rounded-md">More categories</span>
          </div>

          <div className="mid w-1/2">
            <Image className="rounded-md" src="/images/firstsection.jpg" alt="arrow-down" width={700} height={500} />
          </div>

          <div className="last flex flex-col gap-2 w-1/4">
            <div className="one bg-blue-100 flex flex-col gap-2  p-4 rounded-md ">
              <span className="flex items-center gap-2 ">
                <Image src="/user.svg" alt="arrow-down" width={50} height={50} />
                <p className="text-xl">Hi User lets get started with your account!</p>
              </span>
              <button className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 font-semibold text-white text-xl p-2 rounded-md">Join Now</button>
              <button className="text-blue-500 font-semibold  bg-white hover:bg-gray-100 transition-all duration-300 text-xl p-2 rounded-md">Login</button>
            </div>
            <div className="two bg-amber-500 p-4 rounded-md ">
              <p className="text-xl w-3/4 text-white">Get 10% off on your first order</p>
            </div>
            <div className="two bg-teal-500 p-4 rounded-md ">
              <p className="text-xl w-3/4 text-white">Send quotes with your specific preferences</p>
            </div>
          </div>
        </div>

        <div className="secondsection mt-3 gap-5 mx-20 rounded-md bg-white flex p-2">
          <div className="one p-2 w-1/4 ">
            <h1 className="font-bold text-xl">Deals and offers</h1>
            <p className="text-sm text-neutral-500">Exclusive deals and offers on products</p>
            <div className="mt-2">
              <Timer />
            </div>
          </div>

          {dealProducts.map((product, index) => (
            <Link key={product.id} href={`/product/${product.id}`} className="flex-1 border-l border-neutral-200">
              <div className="flex hover:bg-gray-100 transition-all flex-col items-center p-2 w-full">
                <Image src={product.image} alt={product.name} width={150} height={150} />
                <p>{product.name}</p>
                <div className="bg-red-200 text-red-500 p-2 px-4 text-sm rounded-full font-medium">-20%</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="thirdsection mt-3 mx-20 rounded-md bg-white flex p-2 h-auto">
          <div className="one w-1/4">
            <div className="img relative h-full w-full">
              <Image
                src="/images/thirdsectionimg.jpg"
                alt="Background"
                objectFit="cover"
                className="z-0 opacity-40 rounded-md"
                layout="fill"
              />
              <div className="absolute inset-0 flex flex-col gap-2 p-4 z-10">
                <h1 className="text-black text-4xl font-bold">Home and outdoor</h1>
                <button className="bg-white text-black hover:bg-blue-500 hover:text-white transition-all duration-300 px-4 py-2 rounded-md w-fit">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="grid w-3/4 grid-cols-4 grid-rows-2">
            {homeProducts.map((product, index) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className={`hover:bg-gray-100 ${index < 4 ? "border-b" : ""} ${index % 4 !== 3 ? "border-x" : ""} border-neutral-200 flex p-2 relative h-[170px]`}>
                  <div className="one w-1/2">
                    <h1 className="text-xl font-bold truncate">{product.name}</h1>
                    <p className="text-sm text-neutral-500">From ${product.price}</p>
                  </div>
                  <div className="two relative w-full">
                    <Image className="absolute bottom-0 right-0" src={product.image} alt={product.name} width={120} height={120} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="fourthsec mt-3 mx-20 rounded-md bg-white flex p-2 h-auto">
          <div className="one w-1/4">
            <div className="img relative h-full w-full">
              <Image
                src="/images/fourthsec.jpg"
                alt="Background"
                objectFit="cover"
                className="z-0 opacity-40 rounded-md"
                layout="fill"
              />
              <div className="absolute inset-0 flex flex-col gap-2 p-4 z-10">
                <h1 className="text-black text-4xl font-bold">Tech and Electronics</h1>
                <button className="bg-white text-black hover:bg-blue-500 hover:text-white transition-all duration-300 px-4 py-2 rounded-md w-fit">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="grid w-3/4 grid-cols-4 grid-rows-2">
            {techProducts.map((product, index) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className={`hover:bg-gray-100 ${index < 4 ? "border-b" : ""} ${index % 4 !== 3 ? "border-x" : ""} border-neutral-200 flex p-2 relative h-[170px]`}>
                  <div className="one w-1/2">
                    <h1 className="text-xl font-bold truncate">{product.name}</h1>
                    <p className="text-sm text-neutral-500">From ${product.price}</p>
                  </div>
                  <div className="two relative w-full">
                    <Image className="absolute bottom-0 right-0" src={product.image} alt={product.name} width={120} height={120} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="fifthsection mt-3 mx-20 rounded-md  flex p-2 h-95">
          <div className="img relative h-full w-full">
            <Image
              src="/images/fifthsection.jpg"
              alt="Background"
              objectFit="cover"
              className="z-0 opacity-40 rounded-md"
              layout="fill"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-300 opacity-80 rounded-md z-10" />

            {/* Text and Button Content */}
            <div className="absolute inset-0 flex justify-center gap-2 p-4 z-20">
              <div className="one w-1/2 flex flex-col gap-2 ">
                <h1 className="text-white text-4xl font-bold">An easy way to send request to all suppliers across the world!</h1>
                <p className="text-white text-lg">Send quotes with your specific preferences.</p>
              </div>
              <div className="two w-1/2 flex justify-center items-center">
                <div className="bg-white text-black flex flex-col gap-2 transition-all duration-300 p-6 w-3/4 rounded-md h-full">
                  <h1 className="text-2xl font-bold">Send quote to all suppliers</h1>
                  <input className="border border-neutral-200 rounded-md p-2" type="text" placeholder="What do you need?" />
                  <textarea name="" id="" placeholder="Describe your requirements" className="border border-neutral-200 rounded-md p-2"></textarea>
                  <div className="box flex gap-5">
                    <h1 className="text-lg border border-neutral-300 p-2 px-7 rounded-md">Quantity</h1>
                    <input className="border border-neutral-300 rounded-md p-2" type="number" placeholder="Pcs" />
                  </div>
                  <button className="bg-blue-500 hover:cursor-pointer text-white hover:bg-blue-600 font-medium transition-all duration-300 p-3 px-7 rounded-md w-fit">
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sixthsection mt-3 mx-20 rounded-md bg-white p-4 h-auto">
          <h1 className="text-2xl font-bold mb-4">Recommended Products</h1>
          <div className="grid grid-cols-5 grid-rows-2 gap-4">
            {recommendedProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-white hover:bg-gray-100 transition-all duration-300 rounded-md p-2 shadow h-[280px] flex flex-col">
                  <div className="flex justify-center items-center mb-2 h-[180px]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={140}
                      height={140}
                      className="rounded-md object-contain"
                    />
                  </div>
                  <h1 className="text-lg font-semibold">Starting from ${product.price}</h1>
                  <p className="text-sm text-gray-600 truncate">{product.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="subscribe mt-7 w-full flex items-center justify-center flex-col rounded-md bg-gray-200 p-4 h-auto">
          <h1 className="text-2xl font-bold">Subscribe to our newsletter</h1>
          <p className="text-neutral-500">Get the latest updates on our products and services.</p>
          <div className="flex gap-2 mt-2">
            <input className="border border-neutral-200 bg-white w-72 rounded-md p-2" type="text" placeholder="Enter your email" />
            <button className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 p-2 px-7 rounded-md w-fit">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
