# Component Development Guide

## Creating New Module Pages

Each module page should follow this structure:

```jsx
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

const YourModule = () => {
	return (
		<DashboardLayout>
			<div className="space-y-6">
				{/* Page Header */}
				<div>
					<h2 className="text-2xl font-bold text-gray-900">
						Module Name
					</h2>
					<p className="text-gray-600 mt-1">Module description</p>
				</div>

				{/* Your content here */}
				<Card>
					<CardHeader>
						<CardTitle>Section Title</CardTitle>
						<CardDescription>Section description</CardDescription>
					</CardHeader>
					<CardContent>{/* Content */}</CardContent>
				</Card>
			</div>
		</DashboardLayout>
	);
};

export default YourModule;
```

## Available Shadcn/UI Components

Currently installed:

-   `Alert` - Display important messages
-   `Avatar` - User profile pictures
-   `Button` - Interactive buttons
-   `Card` - Content containers
-   `ScrollArea` - Scrollable areas

### Adding More Components

Use the shadcn CLI to add components:

```bash
npx shadcn@latest add [component-name]
```

Common components you might need:

-   `dialog` - Modal dialogs
-   `table` - Data tables
-   `form` - Form inputs
-   `select` - Dropdown selects
-   `input` - Text inputs
-   `badge` - Status badges
-   `dropdown-menu` - Dropdown menus
-   `tabs` - Tab navigation
-   `toast` - Notifications
-   `sheet` - Side panels
-   `calendar` - Date picker
-   `data-table` - Advanced tables

## Animation Patterns with Framer Motion

### Fade In

```jsx
<motion.div
	initial={{ opacity: 0, y: 20 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ duration: 0.4 }}
>
	{/* Content */}
</motion.div>
```

### Staggered Children

```jsx
const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.1 },
	},
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
};

<motion.div variants={container} initial="hidden" animate="show">
	{items.map((item) => (
		<motion.div key={item.id} variants={item}>
			{/* Item content */}
		</motion.div>
	))}
</motion.div>;
```

### Hover Effects

```jsx
<motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
	Button
</motion.button>
```

## State Management

### Local State (useState)

Use for component-specific state:

```jsx
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({});
```

### Server State (TanStack Query)

Use for API data:

```jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetching data
const { data, isLoading, error } = useQuery({
	queryKey: ["members"],
	queryFn: fetchMembers,
});

// Mutating data
const queryClient = useQueryClient();
const mutation = useMutation({
	mutationFn: createMember,
	onSuccess: () => {
		queryClient.invalidateQueries({ queryKey: ["members"] });
	},
});
```

## Icons from Lucide React

Available icons relevant to health club system:

-   `Users`, `UserPlus`, `UserCheck`, `UserX` - Members
-   `Dumbbell`, `Activity` - Fitness
-   `Calendar`, `Clock` - Scheduling
-   `CreditCard`, `DollarSign` - Billing
-   `Calculator`, `TrendingUp`, `TrendingDown` - Accounting
-   `Sparkles`, `Heart` - Services
-   `UserCog`, `Shield` - Staff
-   `Settings`, `Search`, `Bell` - UI
-   `Plus`, `Edit`, `Trash2`, `Eye` - Actions

## Styling Guidelines

### Colors

-   Primary: Blue (`blue-500`, `blue-600`)
-   Secondary: Purple (`purple-500`, `purple-600`)
-   Success: Green (`green-500`, `green-600`)
-   Warning: Orange (`orange-500`, `orange-600`)
-   Error: Red (`red-500`, `red-600`)
-   Neutral: Gray (`gray-50` to `gray-900`)

### Spacing

-   Use Tailwind's spacing scale: `space-y-4`, `space-y-6`
-   Page padding: `p-4 lg:p-6`
-   Card padding: `p-6`

### Typography

-   Page title: `text-2xl font-bold text-gray-900`
-   Section title: `text-xl font-semibold text-gray-800`
-   Description: `text-gray-600`
-   Small text: `text-sm text-gray-500`

### Responsive Design

-   Mobile first approach
-   Use breakpoints: `sm:`, `md:`, `lg:`, `xl:`
-   Grid layouts: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

## Best Practices

1. **Component Structure**

    - Keep components focused and single-purpose
    - Extract reusable logic into custom hooks
    - Use TypeScript for type safety (if migrating)

2. **Performance**

    - Memoize expensive computations with `useMemo`
    - Memoize callbacks with `useCallback`
    - Use React Query for automatic caching

3. **Accessibility**

    - Use semantic HTML
    - Add aria labels where needed
    - Ensure keyboard navigation works

4. **Code Organization**
    - Group related functionality
    - Keep files under 300 lines
    - Use clear, descriptive names

## Next Steps for Development

1. **Authentication Module**

    - Login/Logout pages
    - JWT token handling
    - Protected routes
    - User session management

2. **API Integration**

    - Set up axios or fetch wrapper
    - Configure TanStack Query
    - Error handling
    - Loading states

3. **Member Management**

    - Member list with search/filter
    - Add/Edit member forms
    - Member details view
    - Membership status tracking

4. **Continue with other modules...**
