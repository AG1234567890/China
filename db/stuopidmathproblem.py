numbers = [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5]
products = []
for i in range(0,len(numbers)):
    for j in range(0,len(numbers)):
        if i != j:

            product = numbers[i]*numbers[j]
            if product not in products:
                products.append(product)
print(products)
print(len(products))