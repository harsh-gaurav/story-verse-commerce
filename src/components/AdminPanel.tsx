
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

// Mock data for admin panel
const mockOrders = [
  {
    id: '1001',
    customerEmail: 'john@example.com',
    items: [
      { title: 'The Great Gatsby', quantity: 1, price: 12.99 }
    ],
    total: 12.99,
    status: 'pending',
    date: '2024-01-15'
  },
  {
    id: '1002',
    customerEmail: 'sarah@example.com', 
    items: [
      { title: 'Dune', quantity: 2, price: 16.99 }
    ],
    total: 33.98,
    status: 'shipped',
    date: '2024-01-14'
  }
];

const mockBooks = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 12.99,
    category: 'Classic Literature',
    stockCount: 15,
    inStock: true
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 13.99,
    category: 'Classic Literature',
    stockCount: 8,
    inStock: true
  }
];

export const AdminPanel = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [books, setBooks] = useState(mockBooks);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    category: '', 
    stockCount: '',
    description: '',
    imageUrl: ''
  });

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    const book = {
      id: Date.now().toString(),
      title: newBook.title,
      author: newBook.author,
      price: parseFloat(newBook.price),
      category: newBook.category,
      stockCount: parseInt(newBook.stockCount),
      inStock: parseInt(newBook.stockCount) > 0
    };
    setBooks(prev => [...prev, book]);
    setNewBook({
      title: '',
      author: '',
      price: '',
      category: '',
      stockCount: '',
      description: '',
      imageUrl: ''
    });
  };

  const updateStock = (bookId: string, newStock: number) => {
    setBooks(prev => prev.map(book => 
      book.id === bookId 
        ? { ...book, stockCount: newStock, inStock: newStock > 0 }
        : book
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-purple-100">Manage your bookstore inventory and orders</p>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="add-book">Add Book</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">Order #{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.customerEmail}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.total}</p>
                        <Badge variant={order.status === 'shipped' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm">
                          {item.title} (x{item.quantity}) - ${item.price}
                        </p>
                      ))}
                    </div>
                    
                    <Select 
                      value={order.status} 
                      onValueChange={(status) => updateOrderStatus(order.id, status)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {books.map(book => (
                  <div key={book.id} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{book.title}</h4>
                        <p className="text-sm text-gray-600">by {book.author}</p>
                        <p className="text-sm text-gray-500">{book.category}</p>
                        <p className="font-bold text-blue-600">${book.price}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateStock(book.id, Math.max(0, book.stockCount - 1))}
                        >
                          -
                        </Button>
                        <span className="px-3 py-1 bg-gray-100 rounded">
                          {book.stockCount}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateStock(book.id, book.stockCount + 1)}
                        >
                          +
                        </Button>
                        <Badge variant={book.inStock ? 'default' : 'destructive'}>
                          {book.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-book">
          <Card>
            <CardHeader>
              <CardTitle>Add New Book</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddBook} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Book Title"
                    value={newBook.title}
                    onChange={(e) => setNewBook(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                  <Input
                    placeholder="Author"
                    value={newBook.author}
                    onChange={(e) => setNewBook(prev => ({ ...prev, author: e.target.value }))}
                    required
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    value={newBook.price}
                    onChange={(e) => setNewBook(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                  <Input
                    placeholder="Category"
                    value={newBook.category}
                    onChange={(e) => setNewBook(prev => ({ ...prev, category: e.target.value }))}
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Stock Count"
                    value={newBook.stockCount}
                    onChange={(e) => setNewBook(prev => ({ ...prev, stockCount: e.target.value }))}
                    required
                  />
                  <Input
                    type="url"
                    placeholder="Image URL"
                    value={newBook.imageUrl}
                    onChange={(e) => setNewBook(prev => ({ ...prev, imageUrl: e.target.value }))}
                  />
                </div>
                
                <Textarea
                  placeholder="Book Description"
                  value={newBook.description}
                  onChange={(e) => setNewBook(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px]"
                />
                
                <Button type="submit" className="w-full">
                  Add Book to Inventory
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
