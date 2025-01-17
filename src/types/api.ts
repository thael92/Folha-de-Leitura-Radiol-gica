export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
}

export interface ApiError {
    message: string;
    code: string;
    details?: Record<string, string[]>;
} 