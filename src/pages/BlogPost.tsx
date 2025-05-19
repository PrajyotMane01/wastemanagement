'use client'
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface TextNode {
  mode: string;
  text: string;
  type: string;
  style: string;
  detail: number;
  format: number;
  version: number;
}

interface RichTextNode {
  type: string;
  format: string;
  indent: number;
  version: number;
  children: (RichTextNode | TextNode)[];
  direction?: string | null;
  textStyle?: string;
  textFormat?: number;
  tag?: string;
  listType?: 'number' | 'bullet' | 'check';
  start?: number;
  value?: number;
  checked?: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  content: {
    root: RichTextNode;
  };
  excerpt: string;
  category: string;
  createdAt: string;
  readTime: string;
  slug: string;
  image?: {
    url: string;
  };
}

const fetchBlogPost = async (slug: string): Promise<BlogPost> => {
  console.log('Fetching blog post for slug:', slug);
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs?where[slug][equals]=${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog post');
  }
  const data = await response.json();
  console.log('Received data:', data);
  if (!data.docs || data.docs.length === 0) {
    throw new Error('Blog post not found');
  }
  return data.docs[0];
};

// Function to convert rich text nodes to HTML
const renderRichText = (content: { root: RichTextNode }): string => {
  if (!content?.root?.children) {
    console.error('Invalid content structure:', content);
    return '';
  }

  return content.root.children.map(node => {
    // Handle empty paragraphs
    if (node.type === 'paragraph' && (!node.children || node.children.length === 0)) {
      return '<p><br></p>';
    }

    // Handle paragraphs with text
    if (node.type === 'paragraph') {
      return `<p>${node.children.map(child => {
        if ('text' in child) {
          let text = child.text || '';
          // Handle text formatting based on format number
          if (child.format & 1) text = `<strong>${text}</strong>`; // Bold
          if (child.format & 2) text = `<em>${text}</em>`; // Italic
          if (child.format & 4) text = `<u>${text}</u>`; // Underline
          if (child.format & 8) text = `<code>${text}</code>`; // Code
          if (child.format & 32) text = `<span class="text-[#6C3BAA]">${text}</span>`; // Highlight
          if (child.format & 64) text = `<span class="text-[#C08457]">${text}</span>`; // Secondary color
          return text;
        }
        return '';
      }).join('')}</p>`;
    }

    // Handle headings
    if (node.type === 'heading' && node.tag) {
      const level = node.tag.replace('h', '');
      return `<h${level} class="text-${level === '1' ? '4xl' : level === '2' ? '3xl' : level === '3' ? '2xl' : level === '4' ? 'xl' : level === '5' ? 'lg' : 'base'} font-bold mb-4">${node.children.map(child => {
        if ('text' in child) return child.text;
        return '';
      }).join('')}</h${level}>`;
    }

    // Handle ordered lists
    if (node.type === 'list' && node.listType === 'number') {
      return `<ol class="list-decimal pl-6 mb-4">${node.children.map(item => {
        if (item.type === 'listitem') {
          return `<li class="mb-2">${item.children.map(child => {
            if ('text' in child) return child.text;
            return '';
          }).join('')}</li>`;
        }
        return '';
      }).join('')}</ol>`;
    }

    // Handle unordered lists
    if (node.type === 'list' && node.listType === 'bullet') {
      return `<ul class="list-disc pl-6 mb-4">${node.children.map(item => {
        if (item.type === 'listitem') {
          return `<li class="mb-2">${item.children.map(child => {
            if ('text' in child) return child.text;
            return '';
          }).join('')}</li>`;
        }
        return '';
      }).join('')}</ul>`;
    }

    // Handle checkbox lists
    if (node.type === 'list' && node.listType === 'check') {
      return `<ul class="list-none pl-6 mb-4">${node.children.map(item => {
        if (item.type === 'listitem') {
          const checked = item.checked ? 'checked' : '';
          return `<li class="mb-2 flex items-center gap-2">
            <input type="checkbox" ${checked} disabled class="w-4 h-4 rounded border-gray-300 text-[#6C3BAA] focus:ring-[#6C3BAA]">
            <span>${item.children.map(child => {
              if ('text' in child) return child.text;
              return '';
            }).join('')}</span>
          </li>`;
        }
        return '';
      }).join('')}</ul>`;
    }

    // Handle blockquotes
    if (node.type === 'quote') {
      return `<blockquote class="border-l-4 border-[#6C3BAA] pl-4 py-2 my-4 bg-[#6C3BAA]/5 rounded-r-lg">${node.children.map(child => {
        if ('text' in child) return child.text;
        return '';
      }).join('')}</blockquote>`;
    }

    return '';
  }).join('');
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  console.log('Current slug:', slug);
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => fetchBlogPost(slug!),
    enabled: !!slug,
  });

  console.log('Query result:', { post, isLoading, error });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6F2] to-[#F2F0E8]">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C3BAA]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    console.error('Error or no post:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6F2] to-[#F2F0E8]">
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4">
          <div className="text-red-500 mb-4 text-5xl">😕</div>
          <h3 className="text-xl font-semibold mb-2">Unable to Load Blog Post</h3>
          <p className="text-[#2B2B2B]/70 mb-4">There was an error loading this blog post.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#6C3BAA] text-white rounded-lg hover:bg-[#5a3190] transition-colors"
          >
            Try Again
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const renderedContent = renderRichText(post.content);
  console.log('Rendered content:', renderedContent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F2] to-[#F2F0E8]">
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header (moved above image, left-aligned) */}
          <header className="mb-8 text-left mt-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6C3BAA] to-[#C08457] bg-clip-text text-transparent text-left">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-[#2B2B2B]/70 mb-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-4">
                <Clock size={16} className="mr-2" />
                <span>{post.readTime && post.readTime !== '0' ? post.readTime : 'N/A'}</span>
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#6C3BAA]/10 text-[#6C3BAA] text-sm font-medium ml-2">
                  <span className="flex items-center gap-2">
                    <Tag size={16} />
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
          </header>
          {/* Blog Image */}
          {post.image && post.image.url && (
            <div className="mt-6 mb-10 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={post.image.url}
                alt={post.title}
                className="w-full h-72 object-cover object-center bg-gray-100"
              />
            </div>
          )}
          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-[#2B2B2B] prose-p:text-[#2B2B2B]/80 prose-a:text-[#6C3BAA] prose-strong:text-[#6C3BAA] prose-blockquote:border-l-[#6C3BAA] prose-blockquote:bg-[#6C3BAA]/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg text-left"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />
          {/* Back to Blog Button */}
          <div className="mt-16 text-left">
            <Link to="/Blogs">
              <motion.button 
                className="group relative overflow-hidden border border-[#6C3BAA] px-6 py-3 rounded-full bg-[#6C3BAA] text-white transition-all duration-500 flex items-center gap-2 hover:pr-10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Back to Blog</span>
                <motion.div 
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ArrowRight size={16} className="text-white transition-transform group-hover:translate-x-1" />
                </motion.div>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost; 