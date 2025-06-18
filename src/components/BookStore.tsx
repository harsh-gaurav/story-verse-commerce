
import { useState } from 'react';
import { BookCard } from './BookCard';
import { BookSearch } from './BookSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock book data
const mockBooks = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 12.99,
    category: 'Classic Literature',
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    description: 'A classic American novel set in the Jazz Age.',
    inStock: true,
    stockCount: 15
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 13.99,
    category: 'Classic Literature',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop',
    description: 'A gripping tale of racial injustice and childhood innocence.',
    inStock: true,
    stockCount: 8
  },
  {
    id: '3',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 11.99,
    category: 'Classic Literature',
    rating: 3.9,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop',
    description: 'A controversial novel about teenage rebellion.',
    inStock: false,
    stockCount: 0
  },
  {
    id: '4',
    title: 'Dune',
    author: 'Frank Herbert',
    price: 16.99,
    category: 'Science Fiction',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
    description: 'Epic science fiction novel set on the desert planet Arrakis.',
    inStock: true,
    stockCount: 12
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 14.99,
    category: 'Fantasy',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=300&h=400&fit=crop',
    description: 'A fantasy adventure about Bilbo Baggins.',
    inStock: true,
    stockCount: 20
  },
  {
    id: '6',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 10.99,
    category: 'Romance',
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    description: 'A timeless romance novel set in Regency England.',
    inStock: true,
    stockCount: 18
  }
];

interface BookStoreProps {
  onAddToCart: (book: any) => void;
}

export const BookStore = ({ onAddToCart }: BookStoreProps) => {
  const [books] = useState(mockBooks);
  const [filteredBooks, setFilteredBooks] = useState(mockBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  const categories = ['all', ...Array.from(new Set(books.map(book => book.category)))];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, selectedCategory, sortBy);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchTerm, category, sortBy);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    applyFilters(searchTerm, selectedCategory, sort);
  };

  const applyFilters = (term: string, category: string, sort: string) => {
    let filtered = books;

    // Filter by search term
    if (term) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(term.toLowerCase()) ||
        book.author.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(book => book.category === category);
    }

    // Sort books
    filtered = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredBooks(filtered);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">Discover Your Next Great Read</h2>
          <p className="text-xl opacity-90 mb-6">
            Explore thousands of books across all genres. From timeless classics to modern bestsellers.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Browse Collection
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map(book => (
          <BookCard 
            key={book.id}
            book={book}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
