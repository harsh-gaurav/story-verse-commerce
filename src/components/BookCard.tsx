
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description: string;
  inStock: boolean;
  stockCount: number;
}

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
}

export const BookCard = ({ book, onAddToCart }: BookCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={book.image} 
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={book.inStock ? "default" : "destructive"}>
            {book.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="secondary">
            ⭐ {book.rating}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600">by {book.author}</p>
          <Badge variant="outline" className="text-xs">
            {book.category}
          </Badge>
          <p className="text-sm text-gray-500 line-clamp-2">
            {book.description}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-blue-600">
            ${book.price}
          </span>
          {book.inStock && (
            <span className="text-xs text-gray-500">
              {book.stockCount} available
            </span>
          )}
        </div>
        
        <Button 
          onClick={() => onAddToCart(book)}
          disabled={!book.inStock}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          {book.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};
