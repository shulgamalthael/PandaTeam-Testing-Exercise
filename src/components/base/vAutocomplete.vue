<template>
	<div class="autocomplete">
		<div class="container">
			<input
				class="input"
				:value="modelValue"
				:placeholder="props.placeholder"
				@click="inputClickHandler"
				@input="inputHandler" 
			/>
			<div v-if="props.loading" class="loading">
				<div class="loading-indicator"></div>
			</div>
		</div>
		<div class="input-panel" v-if="!!suggestions && canShowSuggestions">
			<template v-if="!!suggestions && !!suggestions.length">
				<div
					class="input-panel__item" 
					@click="suggestionClickHandler(suggestion)" 
					v-for="suggestion in suggestions" :key="suggestion.value"
				>
					<div>{{ suggestion.label }}</div>
				</div>
			</template>
			<div v-else>Results not found!</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps, defineEmits, ref, watch, onUnmounted, onMounted, toRefs } from 'vue';

	const props = defineProps({
		modelValue: String,
		suggestions: Array || null,
		placeholder: {
			type: String,
			default: '',
		},
		loading: {
			type: Boolean,
			default: false,
		}
	});

	const emit = defineEmits(['update:modelValue', 'update-suggestion', 'complete']);

	const { suggestions, modelValue } = toRefs(props);

	let timeoutId = 0;
	const canSearch = ref(false);
	const canShowSuggestions = ref(false);

	const inputHandler = (event) => {
		canSearch.value = false;
		clearTimeout(timeoutId);
		emit('update:modelValue', event.target.value);

		timeoutId = setTimeout(() => {
			canSearch.value = true;
		}, 200);
	};

	const inputClickHandler = () => {
		if(modelValue.value) {
			canShowSuggestions.value = true;
		}
	};

	const suggestionClickHandler = (suggestion) => {
		emit('update-suggestion', suggestion);
		emit('update:modelValue', suggestion.label);
		canShowSuggestions.value = false;
	};

	const checkTarget = (event) => {
		const checkParent = (parent) => {
			if(parent?.className?.includes('autocomplete')) {
				return parent.className;
			}

			if(parent.parentNode) {
				return checkParent(parent.parentNode);
			}

			return null;
		}

		const className = checkParent(event.target)

		if(!className) {
			canShowSuggestions.value = false;
		}
		// autocomplete
	};

	watch(suggestions, () => {
		if(suggestions.value) {
			canShowSuggestions.value = true;
		} else {
			canShowSuggestions.value = false;
		}
	});

	watch(canSearch, async () => {
		if(canSearch.value && modelValue.value) {
			await emit('complete');
			canShowSuggestions.value = true;
		}
	});

	onMounted(() => {
		window.addEventListener('click', checkTarget)
	})

	onUnmounted(() => {
		window.removeEventListener('click', checkTarget);

		clearTimeout(timeoutId);
	});
</script>

<style scoped>
	.autocomplete {
		width: 100%;
		position: relative;
	}

	.container {
		position: relative;
	}

	.loading {
		position: absolute;
		height: 12px;
		width: 12px;
		right: 12px;
		bottom: 0;
		top: calc(50% - 6px);
		animation: spinn 1s linear infinite;
	}

	@keyframes spinn {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.loading-indicator {
		height: 100%;
		width: 100%;
		border-radius: 50%;
		border: 2px dashed #41b883;
	}

	.input {
		width: 100%;
		border-radius: 15px;
		padding: 5px 15px;
		color: #41b883;
		background-color: #35495e;
		border: 1px solid #41b883;
	}

	.input::placeholder {
		color: #41b883;
	}

	.input-panel {
		z-index: 2;
		width: max-content;
		position: absolute;
		background-color: #41b883;
		max-width: 360px;
		padding: 5px;
		border-radius: 5px;
	}

	.input-panel__item {
		color: #35495e;
		cursor: pointer;
		border-radius: 5px;
		padding: 5px 15px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.input-panel__item:hover {
		background-color: #35495e90;
	}
</style>