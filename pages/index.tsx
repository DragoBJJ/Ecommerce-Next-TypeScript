const Home = () => {
  // const [createProduct, { data, loading, error }] = useCreateProductMutation();
  // const [publishProduct] = usePublishManyProductsMutation();

  // const createManyProducts = async () => {
  //   randomProducts.map(async ({ title, description, price, image }) => {
  //     await createProduct({
  //       variables: {
  //         data: {
  //           name: title,
  //           slug: title,
  //           description: description,
  //           price: Math.round(price),
  //           imageUrl: `${image}`
  //         }
  //       }
  //     });
  //   });
  //   await publishProduct();
  // };

  // useEffect(() => {
  //   createManyProducts();
  // }, []);

  return (
    <div className="flex flex-col h-screen w-screen  justify-center p-2">
      <h1>Home</h1>
    </div>
  );
};

export default Home;
