"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  X,
  Image as ImageIcon,
  PlusCircle,
  MinusCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  detailed_description?: string;
  price: number;
  original_price?: number;
  discount?: number;
  image_url?: string;
  stock: number;
  is_featured: boolean;
  specifications?: any;
  features?: string[];
  created_at?: string;
}

interface ProductFormData {
  name: string;
  description: string;
  detailed_description: string;
  price: string;
  original_price: string;
  discount: string;
  image_url: string;
  image_file: File | null;
  stock: string;
  is_featured: boolean;
  specifications: {
    processor?: string;
    ram?: string;
    storage?: string;
    graphics?: string;
    display?: string;
    battery?: string;
    os?: string;
    generation?: string;
    weight?: string;
    ports?: string;
    warranty?: string;
    brand?: string;
    camera?: string;
    resolution?: string;
    type?: string;
    [key: string]: string | undefined;
  };
  features: string[];
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [newFeature, setNewFeature] = useState("");
  const [showSpecs, setShowSpecs] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    detailed_description: "",
    price: "",
    original_price: "",
    discount: "",
    image_url: "",
    image_file: null,
    stock: "",
    is_featured: false,
    specifications: {
      processor: "",
      ram: "",
      storage: "",
      graphics: "",
      display: "",
      battery: "",
      os: "",
      generation: "",
      weight: "",
      ports: "",
      warranty: "",
      brand: "",
      camera: "",
      resolution: "",
      type: "",
    },
    features: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts((data as Product[]) || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      setUploadProgress(0);

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return null;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be less than 5MB");
        return null;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, file, { cacheControl: "3600" });

      if (uploadError) throw uploadError;

      setUploadProgress(100);

      const {
        data: { publicUrl },
      } = supabase.storage.from("products").getPublicUrl(fileName);

      return publicUrl;
    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert(`Failed to upload image: ${error.message}`);
      return null;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image_file: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleSpecChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      specifications: { ...formData.specifications, [key]: value },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image_url;

      if (formData.image_file) {
        const uploadedUrl = await uploadImage(formData.image_file);
        if (uploadedUrl) imageUrl = uploadedUrl;
        else {
          setLoading(false);
          return;
        }
      }

      // Filter out empty specifications
      const filteredSpecs = Object.fromEntries(
        Object.entries(formData.specifications).filter(
          ([_, v]) => v && v.trim() !== "",
        ),
      );

      const productData = {
        name: formData.name,
        description: formData.description,
        detailed_description: formData.detailed_description || null,
        price: parseFloat(formData.price),
        original_price: formData.original_price
          ? parseFloat(formData.original_price)
          : null,
        discount: formData.discount ? parseInt(formData.discount) : 0,
        image_url: imageUrl || null,
        stock: parseInt(formData.stock),
        is_featured: formData.is_featured,
        specifications: filteredSpecs,
        features: formData.features,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);
        if (error) throw error;
        alert("Product updated successfully!");
      } else {
        const { error } = await supabase.from("products").insert([productData]);
        if (error) throw error;
        alert("Product added successfully!");
      }

      await fetchProducts();
      setShowModal(false);
      resetForm();
    } catch (error: any) {
      console.error("Error saving product:", error);
      alert(`Failed to save product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      detailed_description: "",
      price: "",
      original_price: "",
      discount: "",
      image_url: "",
      image_file: null,
      stock: "",
      is_featured: false,
      specifications: {
        processor: "",
        ram: "",
        storage: "",
        graphics: "",
        display: "",
        battery: "",
        os: "",
        generation: "",
        weight: "",
        ports: "",
        warranty: "",
        brand: "",
        camera: "",
        resolution: "",
        type: "",
      },
      features: [],
    });
    setImagePreview("");
    setNewFeature("");
    setEditingProduct(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      detailed_description: product.detailed_description || "",
      price: product.price?.toString() || "",
      original_price: product.original_price?.toString() || "",
      discount: product.discount?.toString() || "",
      image_url: product.image_url || "",
      image_file: null,
      stock: product.stock?.toString() || "",
      is_featured: product.is_featured || false,
      specifications: {
        processor: product.specifications?.processor || "",
        ram: product.specifications?.ram || "",
        storage: product.specifications?.storage || "",
        graphics: product.specifications?.graphics || "",
        display: product.specifications?.display || "",
        battery: product.specifications?.battery || "",
        os: product.specifications?.os || "",
        generation: product.specifications?.generation || "",
        weight: product.specifications?.weight || "",
        ports: product.specifications?.ports || "",
        warranty: product.specifications?.warranty || "",
        brand: product.specifications?.brand || "",
        camera: product.specifications?.camera || "",
        resolution: product.specifications?.resolution || "",
        type: product.specifications?.type || "",
      },
      features: product.features || [],
    });
    setImagePreview(product.image_url || "");
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const { error } = await supabase.from("products").delete().eq("id", id);
        if (error) throw error;
        await fetchProducts();
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {product.price?.toLocaleString()} Rwf
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.is_featured ? (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        Featured
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/products/${product.id}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => editProduct(product)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setShowModal(false)}
            ></div>

            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Basic Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description shown on product cards"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Detailed Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.detailed_description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          detailed_description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Full product description shown on product page"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (Rwf) *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Original Price (Rwf)
                      </label>
                      <input
                        type="number"
                        value={formData.original_price}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            original_price: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        value={formData.discount}
                        onChange={(e) =>
                          setFormData({ ...formData, discount: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id="is_featured"
                        checked={formData.is_featured}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            is_featured: e.target.checked,
                          })
                        }
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <label
                        htmlFor="is_featured"
                        className="text-sm font-medium text-gray-700 cursor-pointer"
                      >
                        Feature this product on homepage
                      </label>
                    </div>
                  </div>
                </div>

                {/* Product Image */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Product Image
                  </h3>
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="relative inline-block">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview("");
                              setFormData({
                                ...formData,
                                image_file: null,
                                image_url: "",
                              });
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                              <span>Upload a file</span>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  {uploading && (
                    <div className="mt-2">
                      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-2 transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Uploading... {uploadProgress}%
                      </p>
                    </div>
                  )}
                </div>

                {/* Technical Specifications */}
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setShowSpecs(!showSpecs)}
                    className="flex items-center gap-2 text-lg font-semibold text-gray-900 border-b pb-2 w-full text-left"
                  >
                    {showSpecs ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                    Technical Specifications
                  </button>

                  {showSpecs && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Brand
                        </label>
                        <input
                          value={formData.specifications.brand}
                          onChange={(e) =>
                            handleSpecChange("brand", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., Dell, HP, Apple"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Model/Generation
                        </label>
                        <input
                          value={formData.specifications.generation}
                          onChange={(e) =>
                            handleSpecChange("generation", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., 13th Gen, M3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Processor
                        </label>
                        <input
                          value={formData.specifications.processor}
                          onChange={(e) =>
                            handleSpecChange("processor", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., Intel Core i7-13700H"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          RAM
                        </label>
                        <input
                          value={formData.specifications.ram}
                          onChange={(e) =>
                            handleSpecChange("ram", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., 16GB DDR5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Storage
                        </label>
                        <input
                          value={formData.specifications.storage}
                          onChange={(e) =>
                            handleSpecChange("storage", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., 512GB NVMe SSD"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Graphics
                        </label>
                        <input
                          value={formData.specifications.graphics}
                          onChange={(e) =>
                            handleSpecChange("graphics", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., NVIDIA RTX 4060"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Display
                        </label>
                        <input
                          value={formData.specifications.display}
                          onChange={(e) =>
                            handleSpecChange("display", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., 15.6 FHD 144Hz"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Operating System
                        </label>
                        <input
                          value={formData.specifications.os}
                          onChange={(e) =>
                            handleSpecChange("os", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., Windows 11 Pro"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Battery
                        </label>
                        <input
                          value={formData.specifications.battery}
                          onChange={(e) =>
                            handleSpecChange("battery", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., 6-cell 85Wh"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Weight
                        </label>
                        <input
                          value={formData.specifications.weight}
                          onChange={(e) =>
                            handleSpecChange("weight", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., 1.8 kg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ports
                        </label>
                        <input
                          value={formData.specifications.ports}
                          onChange={(e) =>
                            handleSpecChange("ports", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., USB-C, HDMI"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Warranty
                        </label>
                        <input
                          value={formData.specifications.warranty}
                          onChange={(e) =>
                            handleSpecChange("warranty", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., 2 Years"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Camera (for cameras)
                        </label>
                        <input
                          value={formData.specifications.camera}
                          onChange={(e) =>
                            handleSpecChange("camera", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., 24.2MP CMOS"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Resolution
                        </label>
                        <input
                          value={formData.specifications.resolution}
                          onChange={(e) =>
                            handleSpecChange("resolution", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., 4K, 1080p"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product Type
                        </label>
                        <input
                          value={formData.specifications.type}
                          onChange={(e) =>
                            handleSpecChange("type", e.target.value)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="e.g., Laptop, Desktop, Printer"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Key Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Key Features
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Add a feature (e.g., Backlit Keyboard)"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <PlusCircle className="w-5 h-5" />
                    </button>
                  </div>
                  {formData.features.length > 0 && (
                    <div className="space-y-2">
                      {formData.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-700">✓ {feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(idx)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <MinusCircle className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading || uploading
                      ? "Saving..."
                      : editingProduct
                        ? "Update Product"
                        : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
